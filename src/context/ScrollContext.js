import React, { createContext, useContext, useRef } from "react";

export const ScrollContext = createContext();

export const ScrollContextProvider = ({ children }) => {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const sectionFourRef = useRef(null);
  const sectionFiveRef = useRef(null);

  const scrollIntoView = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSecOne = () => scrollIntoView(sectionOneRef);
  const scrollToSecTwo = () => scrollIntoView(sectionTwoRef);
  const scrollToSecThree = () => scrollIntoView(sectionThreeRef);
  const scrollToSecFour = () => scrollIntoView(sectionFourRef);
  const scrollToSecFive = () => scrollIntoView(sectionFiveRef);

  const values = {
    refs: { sectionOneRef, sectionTwoRef, sectionThreeRef, sectionFourRef,sectionFiveRef },
    scrollFunctions: {
      scrollToSecOne,
      scrollToSecTwo,
      scrollToSecThree,
      scrollToSecFour,
      scrollToSecFive
    },
  };

  return (
    <ScrollContext.Provider value={values}>{children}</ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error(
      "useScrollContext must be used within a ScrollContextProvider"
    );
  }
  return context;
};