import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import handshake from "assets/images/handshake.png";
import internet from "assets/images/internet.png";
import person from "assets/images/person.png";

function PartnershipSection() {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const controlsCards = useAnimation();

  const [cardsInViewRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (cardsInView) {
      controlsCards.start("visible");
    }
  }, [controlsCards, cardsInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="backgroundImage_partnership w-full h-auto pb-[100px] bg-[#D7D7D7]">
      <motion.h1
        ref={textRef}
        variants={variants}
        initial="hidden"
        animate={textInView ? "visible" : "hidden"}
        transition={{ duration: 0.2, delay: 0.3 }}
        className="saddlefit_partnership"
      >
        Saddlefit / pro equine group partnership
      </motion.h1>
      <motion.div
        key="cards"
        initial="hidden"
        animate={controlsCards}
        variants={containerVariants}
        ref={cardsInViewRef}
        className="w-[90%] sm:w-[90%] flex flex-wrap gap-x-10 gap-y-10 justify-center 2xl:justify-between mx-auto"
      >
        <motion.div
          variants={childVariants}
          className="bg-[#2B364B] rounded-lg  w-[400px] h-[450px] sm:min-h-[500px]"
        >
          <div className="w-[150px] h-[150px] bg-[#5C80B6] mx-auto my-14 flex justify-center items-center rounded-full">
            <img src={handshake} alt="handshake" className="w-24 h-24" />
          </div>
          <p className="partnership-paragraph">
            Joint venture to be the #1 saddle tree manufacturer in the USA.
          </p>
        </motion.div>
        <motion.div
          variants={childVariants}
          className="bg-[#2B364B] rounded-lg  w-[400px] h-[450px] sm:min-h-[500px]"
        >
          <div className="w-[150px] h-[150px] bg-[#5C80B6] mx-auto my-14 flex justify-center items-center rounded-full">
            <img src={person} alt="person" className="w-24 h-24" />
          </div>
          <p className="partnership-paragraph !w-[80%]">
            Sell custom fit saddle trees to other premium saddle brands.
          </p>
        </motion.div>

        <motion.div
          variants={childVariants}
          className="bg-[#2B364B] rounded-lg  w-[400px] h-[450px] sm:min-h-[500px]"
        >
          <div className="w-[150px] h-[150px] bg-[#5C80B6] mx-auto my-14 flex justify-center items-center rounded-full">
            <img src={internet} alt="internet" className="w-24 h-24" />
          </div>
          <p className="partnership-paragraph !w-[70%]">
            Position Pro Equine Group / SaddleFit to have majority market share
            for USA saddle tree market.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PartnershipSection;