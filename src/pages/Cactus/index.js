import React from "react";
import HeroSection from "./HeroSection";
import { SecondBanner } from "../LandingPage/SecondBanner";
import { FirstBanner } from "../LandingPage/FirstBanner";
import { Testimonials } from "../LandingPage/Testimonials";
import SaddleSelectionControls from "./SaddleSelectionControls";

const Cactus = () => {
  return (
    <>
      <HeroSection />
      <SaddleSelectionControls />
      <SecondBanner type="CACTUS" />
      <Testimonials />
      <FirstBanner type="CACTUS" />
    </>
  );
};

export default Cactus;
