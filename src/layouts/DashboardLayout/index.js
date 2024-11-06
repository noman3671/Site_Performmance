import "./style.scss";
import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { setContext } = useOutletContext();
  // useEffect(() => {
  //   setContext({
  //     layoutAdditionalClass: "b-layout--dashboard",
  //   });
  // }, []);

  return <Outlet />;
};