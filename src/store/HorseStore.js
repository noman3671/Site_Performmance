import { AppContextProxy, useAppContext } from "context/AppContext";
import React, { useEffect, useMemo } from "react";
import { listHorses } from "services/horses.ts";
import S3ImageWrapper from "components/Wrapper/S3ImageWrapper";
import moment from "moment";
import { parseExtendedISODate } from "aws-date-utils";
import { ActionsContextProxy } from "context/ActionsContext";
ActionsContextProxy;

import { deleteHorse as deleteHorseApi } from "services/horses.ts";

export function reducer(stateR, action = {}) {
  const state = { ...stateR };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case "setUserHorses":
      state.userHorses = [...action.payload];

      if (state.userHorses.length && !state.selectedHorseForStore) {
        state.selectedHorseForStore = state.userHorses[0];
      }
      break;
    case "setSelectedHorseForStore":
      state.selectedHorseForStore = { ...action.payload };
      break;
    case "removeUserHorseById":
      state.userHorses.splice(
        state.userHorses.findIndex((h) => h.id === action.payload),
        1
      );
      break;
    case "setHorsesInitRetrieved":
      state.horsesInitRetrieved = true;
      break;
  }

  return { ...state };
}

export let HorseContextProxy = {};

export const useHorseStore = () => {
  const [appState, appAction] = useAppContext();

  const horseStore = useMemo(() => appState.HorseStore, [appState.HorseStore]);
  const state = useMemo(() => {
    return {
      ...horseStore,
      action: (params) => appAction({ module: "HorseStore", ...params }),
    };
  }, [appAction, horseStore]);

  useEffect(() => {
    HorseContextProxy = Object.assign(HorseContextProxy, {
      state,
      action: appAction,
    });
  }, [state]);

  return state;
};

export const deleteHorses = async (horseIds = []) => {
  ActionsContextProxy.changeActionState({ deletingUserHorse: true });
  let promises = [];
  horseIds.forEach((horseId) => {
    promises.push(
      deleteHorseApi(horseId)
        .then(() => {
          HorseContextProxy.action({
            module: "HorseStore",
            type: "removeUserHorseById",
            payload: horseId,
          });
        })
        .catch()
    );
  });

  await Promise.all(promises).finally(() => {
    ActionsContextProxy.changeActionState({ deletingUserHorse: false });
  });
};

export const fetchHorses = async () => {
  const [, appAction] = AppContextProxy;
  ActionsContextProxy.changeActionState({ fetchingUserHorses: true });
  try {
    await listHorses().then((response) => {
      appAction({
        module: "HorseStore",
        type: "setUserHorses",
        payload: response.data.listUserHorses.items.map((horse) => {
          return {
            ...horse,
            image: <S3ImageWrapper className="max-h-full" imgKey={horse.photo} />,
            name: horse.name,
            last_scan: horse.scannedAt
              ? moment(parseExtendedISODate(horse.scannedAt)).format(
                  "DD MMM YYYY"
                )
              : null,
            dob: moment(parseExtendedISODate(horse.dob)).format("DD MMM YYYY"),
          };
        }),
      });
      appAction({
        module: "HorseStore",
        type: "setHorsesInitRetrieved",
        payload: true,
      });
    });
  } catch (e) {}
  ActionsContextProxy.changeActionState({ fetchingUserHorses: false });
};

// eslint-disable-next-line import/no-anonymous-default-export
export function initialState() {
  return {
    userHorses: [],
    horsesInitRetrieved: false,
    defaultHorse: null,
    selectedHorseForStore: null,
  };
}
