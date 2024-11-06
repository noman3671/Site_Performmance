import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import branding_vector from "assets/icons/branding_vector.svg";
import horse_bg from "assets/icons/branding_horse.svg";
import Button from "components/Buttons";

function HeroSection() {
  const controlsScan = useAnimation();
  const controlsFit = useAnimation();
  const controlsPerform = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controlsScan.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.6 },
      });
      await controlsFit.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
      });
      await controlsPerform.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
      });
    };
    sequence();
  }, [controlsScan, controlsFit, controlsPerform]);

  return (
    <div className="background_image w-full h-[100vh] relative">
      <img
        src={branding_vector}
        alt=""
        className="absolute  xl:block hidden top-[-60px] right-32"
      />

      <img src={horse_bg} className="img" alt="horse_bg" />

      <div className="w-[80%] 2xl:w-[70%] absolute top-1/2 2xl:top-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controlsScan}
          className="branding_heading"
        >
          ENHANCING EQUINE COMFORT & PERFORMANCE
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controlsFit}
          className="branding_small_heading mt-8 sm:mt-[44.83px]"
        >
          Revolutionizing Saddle Fitting
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={controlsPerform}>
          <Button className="cart_select_btn mt-[31.34px]" primary>
            Contact us
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
