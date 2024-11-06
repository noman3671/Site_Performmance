import moment from "moment";
import { useAppContext } from "context/AppContext";
import { useEffect, useMemo } from "react";
import { parseExtendedISODate } from "aws-date-utils";
import { ActionsContextProxy } from "context/ActionsContext";
import {
  deleteSaddle as deleteSaddleApi,
  listUserSaddles,
} from "services/saddles.ts";
import { Cache } from "aws-amplify/utils";
import findLastIndex from "lodash/findLastIndex";
import sumBy from "lodash/sumBy";
import { useAuthStore } from "store/AuthStore";

export const MAX_ITEMS_IN_CART = 10;
export const TAX_PERCENT = (cart) => {
  return sumBy(cart.items, "price") + 0;
};

export function reducer(stateR, action = {}) {
  const state = { ...stateR };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case "setUserSaddles":
      state.userSaddles = [...action.payload.items];
      state.userSaddlesCount = action.payload.count;
      state.userSaddlesNextToken = action.payload.nextToken;
      break;
    case "removeUserSaddleById":
      state.userSaddles.splice(
        state.userSaddles.findIndex((h) => h.id === action.payload),
        1
      );
      break;
    case "setSaddlesInitRetrieved":
      state.saddlesInitRetrieved = true;
      break;
    case "addProductToCart":
      state.cart.items.push({ ...action.payload });
      break;
    case "clearCart":
      state.cart.items = [];
      break;
    case "setCartItemsCached":
      state.cart = {
        ...action.payload,
        items: [...action.payload.items, ...state.cart.items],
      };
      break;
    case "removeItemFromCartById":
      const index = findLastIndex(state.cart.items, ["id", action.payload]);
      state.cart.items.splice(index, 1);
      break;
    case "removeAllItemsFromCartById":
      state.cart.items = state.cart.items.filter(
        (i) => i.id !== action.payload
      );
      break;
  }
  const expires = new Date();
  expires.setDate(expires.getDate() + 14);
  Cache.setItem("cart-store", JSON.stringify(state.cart), {
    expires: expires.getTime(),
  });

  return { ...state };
}

export let SaddleContextProxy = {};

const fetchCartCache = async (authorizedUser) => {
  const cartCached = await Cache.getItem("cart-store");

  try {
    if (cartCached) {
      SaddleContextProxy.action({
        module: "SaddleStore",
        type: "setCartItemsCached",
        payload: JSON.parse(cartCached),
      });
    }
  } catch (e) {
    Cache.removeItem("cart-store");
  }
};

let retrivedCache = false;

export const useSaddleStore = () => {
  const [appState, appAction] = useAppContext();
  const auth = useAuthStore();

  const saddleStore = useMemo(
    () => appState.SaddleStore,
    [appState.SaddleStore]
  );
  const state = useMemo(() => {
    return {
      ...saddleStore,
      action: (params) => appAction({ module: "SaddleStore", ...params }),
    };
  }, [appAction, saddleStore]);

  useEffect(() => {
    SaddleContextProxy = Object.assign(SaddleContextProxy, {
      state,
      action: state.action,
    });
    if (!retrivedCache) {
      fetchCartCache(auth);
      retrivedCache = true;
    }
  }, [state]);

  return state;
};

export const deleteSaddles = async (ids = []) => {
  ActionsContextProxy.changeActionState({ deletingUserSaddle: true });
  let promises = [];
  ids.forEach((id) => {
    promises.push(
      deleteSaddleApi(id)
        .then(() => {
          SaddleContextProxy.action({
            module: "SaddleStore",
            type: "removeUserSaddleById",
            payload: id,
          });
        })
        .catch()
    );
  });

  await Promise.all(promises).finally(() => {
    ActionsContextProxy.changeActionState({ deletingUserSaddle: false });
  });
};

export const fetchSaddles = async (params = {}) => {
  const { action: appAction } = SaddleContextProxy;
  ActionsContextProxy.changeActionState({ fetchingUserSaddles: true });

  try {
    await listUserSaddles(params).then((response) => {
      appAction({
        type: "setUserSaddles",
        payload: {
          nextToken: response.data.listUserSaddles.nextToken,
          count: response.data.listUserSaddles.count,
          items: response.data.listUserSaddles.items.map((saddle) => {
            return {
              ...saddle,
              // image: saddle.photo ? <S3Image className="max-h-full" imgKey={saddle.photo}/> : <div css={[styles]}><UploadSaddleIcon viewBox={{width: '30px', height: '30px'}}/></div>,
              created_at: saddle.createdAt
                ? moment(saddle.createdAt).format("DD MMM YYYY")
                : null,
              last_scan: saddle.scannedAt
                ? moment(parseExtendedISODate(saddle.scannedAt)).format(
                    "DD MMM YYYY"
                  )
                : null,
            };
          }),
        },
      });
      appAction({ type: "setSaddlesInitRetrieved", payload: true });
    });
  } catch (e) {}
  ActionsContextProxy.changeActionState({ fetchingUserSaddles: false });
};

// eslint-disable-next-line import/no-anonymous-default-export
export function initialState() {
  return {
    userSaddles: [],
    userSaddlesCount: 0,
    userSaddlesNextToken: null,
    saddlesInitRetrieved: false,
    cart: {
      items: [],
    },
  };
}
