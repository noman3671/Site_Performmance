import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [eventToggle, setEventToggle] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <ToggleContext.Provider
      value={{
        toggle,
        setToggle,
        eventToggle,
        selectedEvents,
        setEventToggle,
        setSelectedEvents
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
};
export { ToggleProvider, useToggleContext };
