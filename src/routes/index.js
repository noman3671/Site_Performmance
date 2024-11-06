import NoMatchPage from "pages/404";
import LandingLayout from "layouts/LandingLayout";
import { MyHorses } from "pages/MyHorses";
import InsideLayout from "layouts/InsideLayout";
import LandingPage from "pages/LandingPage";
import { TermsAndCondition } from "pages/TermsAndPolicy/TermsAndCondition";
import { PrivacyPolicy } from "pages/TermsAndPolicy/PrivacyPolicy";
import { ProtectedGuard } from "guards/LoggedInGuard";
import { BuySaddles } from "pages/BuySaddles";
import { SaddleDetails } from "pages/MySaddle/SaddleDetails";
import Favorite from "pages/Favorite";
import CartPage from "pages/CartPage";
import Event from "pages/EventPage";
import Profile from "pages/Profile";
import AddSellSaddle from "pages/MySaddle/AddSellSaddle";
import MySaddle from "pages/MySaddle";
import AddMySaddle from "pages/MySaddle/AddMySaddle";
import EditMySaddle from "pages/MySaddle/EditMySaddle";
import EditSellSaddle from "pages/MySaddle/EditSellSaddle";
import BuyandSell from "pages/BuyandSell";
import RegisterModal from "../components/Modal/Auth/RegisterModal";
import {
  ScrollContextProvider,
  SaddleProvider,
  CartProvider,
  ToggleProvider,
  UploadProvider,
  HorseProvider,
} from "context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import React, { useEffect } from "react";
import Cactus from "../pages/Cactus";
import { useModalContext } from "context/ModalContext";
import { useLoggedIn } from "context/LoggedInContext";
import RemoveTrailingSlash from "../utils/removeTrailingSlash";

const AppRoutes = () => {
  const { user } = useLoggedIn();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location?.state || {};
  const { toggleModal } = useModalContext();

  useEffect(() => {
    if (location.pathname === "/signup" && !user) {
      toggleModal("isRegisterModalOpen");
    } else if (user && location.pathname === "/signup") {
      navigate("/");
    }
  }, [location, user]);

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="*" element={<NoMatchPage />} />

      <Route
        element={
          <ScrollContextProvider>
            <CartProvider>
              <LandingLayout />
            </CartProvider>
          </ScrollContextProvider>
        }
      >
        <Route index element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            <>
              <LandingPage />
              <RegisterModal />
            </>
          }
        />
      </Route>

      <Route
        element={
          <ProtectedGuard>
            <ScrollContextProvider>
              <SaddleProvider>
                <InsideLayout />
              </SaddleProvider>
            </ScrollContextProvider>
          </ProtectedGuard>
        }
      >
        <Route path="saddle/:id" element={<SaddleDetails />} />
        {/* Protected routes */}
        <Route path="user">
          <Route path="my-saddle" element={<MySaddle />} />
          <Route path="my-saddle/create" element={<AddMySaddle />} />
          <Route path="my-saddle/edit" element={<EditMySaddle />} />
          <Route path="sell-saddle/create" element={<AddSellSaddle />} />
          <Route path="sell-saddle/edit" element={<EditSellSaddle />} />
          <Route
            path="horses"
            element={
              <HorseProvider>
                <MyHorses />
              </HorseProvider>
            }
          />
        </Route>
        <Route
          path="profile"
          element={
            <UploadProvider>
              <Profile />
            </UploadProvider>
          }
        />
        <Route path="cart" element={<CartPage />} />

        <Route
          path="buy"
          element={
            <SaddleProvider>
              <BuySaddles />
            </SaddleProvider>
          }
        />
      </Route>

      {/* Non-protected routes */}
      <Route
        element={
          <ScrollContextProvider>
            <InsideLayout />
          </ScrollContextProvider>
        }
      >
        <Route
          path="event"
          element={
            <ToggleProvider>
              <Event />
            </ToggleProvider>
          }
        />
        <Route path="terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="cactus" element={<Cactus />} />
      </Route>
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <RemoveTrailingSlash />
    <AppRoutes />
  </Router>
);

export default AppWrapper;
