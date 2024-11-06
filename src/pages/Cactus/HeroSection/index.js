import React from "react";
import CactusSaddleryLogo from "../../../assets/icons/cactus_saddlery_logo.svg?react";
import "./style.css";
import { Button } from "@aws-amplify/ui-react";

const HeroSection = () => {
  return (
    <div className="cactus_backgroundImage flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <CactusSaddleryLogo className="w-[125px] h-[66px] md:w-[203px] md:h-[108px]" />
        <p className="cactus_subtitle">ESTABLISHED IN 2003</p>
        <h2 className="cactus_title">MADE IN THE USA</h2>
        <p className="cactus_description">
          Every saddle is hand-crafted in Greenville, TX. We are the Choice of
          Champions.
        </p>
        <Button className="cactus_story_btn">Our Story</Button>
      </div>
    </div>
  );
};

export default HeroSection;
