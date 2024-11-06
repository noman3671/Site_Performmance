import "./style.css";
import React from "react";
import ContactSection from "./ContactSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";
import PartnershipSection from "./PartnershipSection";
import ProcessSection from "./ProcessSection";

function PartnerPage() {
  const data = [
    {
      step: 1,
      title: "3D Scanning the horse and saddle.",
    },
    {
      step: 2,
      title: "Analyze the data to determine the ideal saddle fit.",
    },
    {
      step: 3,
      title:
        "Provide accurate 3D measurements from the horse's back to determine proper saddle size.",
    },
    {
      step: 4,
      title:
        "Give the client recommendations for saddles that fit their horse's unique size and shape.",
    },
    {
      step: 5,
      title:
        "Provide 3D measurement data to manufacturer for saddle trees custom fit to the horse.",
    },
  ];

  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <FeaturesSection data={data} />
      <ProcessSection />
      <PartnershipSection />
      <ContactSection />
    </>
  );
}

export default PartnerPage;