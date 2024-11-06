import "./style.css";

import { Outlet } from "react-router-dom";
import React from "react";
import { Header, Footer } from "components/Layout";
import { CartProvider } from "context";
import LoginModal from "components/Modal/Auth/LoginModal";
import RegisterModal from "components/Modal/Auth/RegisterModal";
import ForgotPasswordModal from "components/Modal/Auth/ForgotPasswordModal";
import VerifyPhoneCodeModal from "../../components/Modal/Auth/VerifyPhoneCodeModal";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <VerifyPhoneCodeModal />
    </CartProvider>
  );
};
