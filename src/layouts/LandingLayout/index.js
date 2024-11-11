import "./style.scss";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "components/Layout";
import alignmentClasses from "utils/landing_page.json";
import LoginModal from "components/Modal/Auth/LoginModal";
import RegisterModal from "components/Modal/Auth/RegisterModal";
import ForgotPasswordModal from "components/Modal/Auth/ForgotPasswordModal";
import VerifyPhoneCodeModal from "../../components/Modal/Auth/VerifyPhoneCodeModal";
import { useModalContext } from "../../context/ModalContext";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { video } = alignmentClasses;
  const { toggleModal } = useModalContext();

  const videoPaths = ["/", "/signup"];
  const shouldDisplayVideo = videoPaths.includes(window.location.pathname);

  return (
    <div className="hero_sec_img">
      <div className="video-container">
        {shouldDisplayVideo && (
          <video
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
            className="w-screen"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute top-0 !z-10 w-full h-full">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <VerifyPhoneCodeModal />
    </div>
  );
};
