import { fetchUserAttributes } from "aws-amplify/auth";
import { createContext, useState, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_USER_DATA } from "apollo/queries/ClientProfile";
import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemInStorage,
} from "utils/localStorage";
import useScreenSize from "hooks/useScreenSize";

const LoggedInContext = createContext();

const LoggedInProvider = ({ children }) => {
  const [user, setUser] = useState(getItemFromStorage("cache_user"));
  const [loading, setLoading] = useState(false);
  const [isAction, setIsAction] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { toggle, setToggle } = useScreenSize();

  const {
    loading: isClientDataLoading,
    error: isError,
    data: clientData,
    refetch,
  } = useQuery(gql(GET_USER_DATA), {
    skip: !user,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (clientData && klaviyo) {
      klaviyo.push([
        "identify",
        {
          email: clientData?.user?.email,
          $first_name: clientData?.user?.firstName,
          $last_name: clientData?.user?.lastName,
        },
      ]);

      klaviyo.push(["track", "Active on Site"]);
    }
  }, [clientData]);

  const fetchUser = async () => {
    await refetch();
    try {
      setLoading(true);
      const response = await fetchUserAttributes();
      setUser(response);
      setItemInStorage("cache_user", response);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  const reset = () => {
    setUser(null);
    removeItemFromStorage("cache_user");
    removeItemFromStorage("profileFormData");
  };

  return (
    <LoggedInContext.Provider
      value={{
        user,
        show,
        clientData,
        isError,
        isClientDataLoading,
        setShow,
        isOpen,
        setIsOpen,
        reset,
        loading,
        isAction,
        fetchUser,
        setIsAction,
        toggle,
        setToggle,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

const useLoggedIn = () => {
  const context = useContext(LoggedInContext);
  if (context === undefined) {
    throw new Error("useLoggedIn must be used within a LoggedInProvider");
  }
  return context;
};

export { LoggedInProvider, useLoggedIn };
