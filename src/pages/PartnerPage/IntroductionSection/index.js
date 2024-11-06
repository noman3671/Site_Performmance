import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import branding_horse_man from "assets/images/branding_horse_man.png";
import PartnerCards from "./PartnerCards";
import WhySaddlefit from "./WhySaddlefit";

function IntroductionSection() {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: heading1Ref, inView: heading1InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: paragraph1Ref, inView: paragraph1InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: heading2Ref, inView: heading2InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: paragraph2Ref, inView: paragraph2InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const controls = useAnimation();

  const { ref: firstCardRef, inView: firstCardInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (firstCardInView) {
      controls.start("visible");
    }
  }, [firstCardInView, controls]);

  return (
    <div className="w-full py-10 min-h-[500px] 2xl:h-[1300px]  bg-[#5C80B6] relative">
      <PartnerCards />
      <div className="flex justify-center">
        <div
          ref={firstCardRef}
          className="2xl:absolute 2xl:bottom-0 2xl:block hidden left-[-200px]"
        >
          <motion.img
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { delay: 0.6, duration: 1 },
              },
            }}
            src={branding_horse_man}
          />
        </div>
        <div className="w-[90%] xl:w-[70%] 2xl:relative 2xl:top-0 2xl:right-[-200px] 2xl:w-[60%]">
          <motion.p
            ref={textRef}
            variants={variants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="welcome_saddlefit text-center pt-[50px] md:pt-[100px]"
          >
            Welcome to Saddle Fit
          </motion.p>
          <div className="flex flex-wrap  2xl:w-[1000px] lg:flex-nowrap justify-center lg:justify-between mt-[20px]">
            <div className="w-[420px]">
              <motion.p
                ref={heading1Ref}
                variants={variants}
                initial="hidden"
                animate={heading1InView ? "visible" : "hidden"}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="discover_saddle"
              >
                Discover the SaddleFit Difference
              </motion.p>
              <motion.p
                ref={paragraph1Ref}
                variants={variants}
                initial="hidden"
                animate={paragraph1InView ? "visible" : "hidden"}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="discover_para 2xl:!w-[498.967px]"
              >
                Explore how our commitment to innovation transforms your riding
                experience. With advanced 3D scanning and bespoke manufacturing,
                we guarantee saddles that fit perfectly, improve performance,
                and prevent common equine discomforts. Each SaddleFit creation
                is a testament to our dedication to quality, the spirit of the
                equestrian community, and the welfare of your horse.
              </motion.p>
            </div>
            <div className="w-[440px]">
              <motion.p
                ref={heading2Ref}
                variants={variants}
                initial="hidden"
                animate={heading2InView ? "visible" : "hidden"}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="discover_saddle"
              >
                Crafting Precision with Every Stitch
              </motion.p>
              <motion.p
                ref={paragraph2Ref}
                variants={variants}
                initial="hidden"
                animate={paragraph2InView ? "visible" : "hidden"}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="discover_para_second 2xl:w-[550.961px]"
              >
                At SaddleFit, every saddle begins with precision. Our master
                craftsmen employ state-of-the-art 3D technology to ensure every
                saddle is not just a piece of equipment, but a gateway to
                enhancing the profound connection between horse and rider.
                Embrace the journey of Best Fit and superior performance as
                we meticulously craft each saddle with dedication to comfort and
                durability.
              </motion.p>
            </div>
          </div>
          <WhySaddlefit />
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;