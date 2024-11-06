import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useMemo, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useAppContext } from "../context/AppContext";

export function reducer(state, action = {}) {
  switch (action.type) {
    case "setAuthorized":
      state = {
        ...state,
        isAuthorized: !!action.payload,
      };

      return state;
    case "setAuthorizedCredentials":
      state = {
        ...state,
        authorizedUser: action.payload,
      };

      return state;
    case "setUserAttributes":
      state = {
        ...state,
        userAttributes: action.payload,
      };

      return state;
    default:
      return state;
  }
}

export function fetchAuthorized() {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      resolve({ username, userId, signInDetails });
    } catch (e) {
      reject(e);
    }
  });
}

export const useAuthStore = () => {
  const [appState, appAction] = useAppContext();
  const isAuthorized = useMemo(
    () => appState.AuthStore.isAuthorized,
    [appState.AuthStore.isAuthorized]
  );
  const authorizedUser = useMemo(
    () => appState.AuthStore.authorizedUser,
    [appState.AuthStore.authorizedUser]
  );
  const userAttributes = useMemo(
    () => appState.AuthStore.userAttributes,
    [appState.AuthStore.userAttributes]
  );
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthorizedAmplify = authStatus === "authenticated";
  const [state, setState] = useState({
    isAuthorized: isAuthorized,
    authorizedUser: authorizedUser,
    userAttributes: userAttributes,
  });

  useEffect(() => {
    if (!isAuthorizedAmplify) {
      appAction({ module: "AuthStore", type: "setAuthorized", payload: false });
      appAction({
        module: "AuthStore",
        type: "setUserAttributes",
        payload: null,
      });
      appAction({
        module: "AuthStore",
        type: "setAuthorizedCredentials",
        payload: null,
      });
    }
  }, [isAuthorizedAmplify]);

  useEffect(() => {
    setState({
      isAuthorized: isAuthorized,
      authorizedUser: authorizedUser,
      userAttributes: userAttributes,
    });
  }, [isAuthorized, authorizedUser, userAttributes]);

  return state;
};

// eslint-disable-next-line import/no-anonymous-default-export
export function initialState() {
  return {
    authorizedUser: null,
    isAuthorized: false,
    userAttributes: null,
  };
}
