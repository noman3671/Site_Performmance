import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import check_icon from "assets/icons/check.svg";

function WhySaddlefit() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: item1Ref, inView: item1InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: item2Ref, inView: item2InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: item3Ref, inView: item3InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="2xl:pl-[180px] mt-8">
      <motion.p
        ref={titleRef}
        variants={variants}
        initial="hidden"
        animate={titleInView ? "visible" : "hidden"}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="choose_saddle"
      >
        Why Choose SaddleFit?
      </motion.p>
      <motion.div
        ref={item1Ref}
        variants={variants}
        initial="hidden"
        animate={item1InView ? "visible" : "hidden"}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex items-center gap-x-2"
      >
        <div className="check_icon sm:block hidden h-[18px] w-[18px]">
          <img src={check_icon} alt="Check Icon" />
        </div>
        <div className="precision_eng">
          <span className="heading_saddle mr-1">Precision Engineering:</span>
          Harnessing the latest in 3D technology for a flawless fit.
        </div>
      </motion.div>
      <motion.div
        ref={item2Ref}
        variants={variants}
        initial="hidden"
        animate={item2InView ? "visible" : "hidden"}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex items-center gap-x-2"
      >
        <div className="check_icon sm:block hidden h-[18px] w-[18px]">
          <img src={check_icon} alt="Check Icon" />
        </div>
        <div className="precision_eng">
          <span className="heading_saddle mr-1">
            Enhanced Comfort & Performance:
          </span>
          Reducing injuries and maximizing comfort for both horse and rider.
        </div>
      </motion.div>
      <motion.div
        ref={item3Ref}
        variants={variants}
        initial="hidden"
        animate={item3InView ? "visible" : "hidden"}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex items-center gap-x-2"
      >
        <div className="check_icon sm:block hidden h-[18px] w-[18px]">
          <img src={check_icon} alt="Check Icon" />
        </div>
        <div className="precision_eng">
          <span className="heading_saddle mr-1">Innovative Designs:</span>
          Continuously evolving product lines to meet the demands of <br />{" "}
          modern equestrian sports.
        </div>
      </motion.div>
    </div>
  );
}

export default WhySaddlefit;
