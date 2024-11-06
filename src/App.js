import "./index.css";
import React from "react";
import AppRoutes from "routes";
import "@aws-amplify/ui-react/styles.css";
import { ReactModals } from "components/Modal/Notification/NotificationModal";
import {
  AppContextProvider as AppStoreProvider,
  LoggedInProvider,
  ActionsProvider,
  ModalProvider,
} from "context";

export default function App(props) {
  return (
    <LoggedInProvider>
      <AppStoreProvider>
        <ActionsProvider>
          <ModalProvider>
            <ReactModals></ReactModals>
            <AppRoutes />
          </ModalProvider>
        </ActionsProvider>
      </AppStoreProvider>
    </LoggedInProvider>
  );
}
