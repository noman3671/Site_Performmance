import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import saddleBigImage from "assets/images/saddleimagebig.png";
import arrowRight from "assets/images/rightArrow.png";

function ProcessSection() {
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
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="w-full h-auto py-5 px-[20px] sm:px-[100px] bg-[#5C80B6] relative">
      <div className="flex w-[100%] md:w-auto">
        <motion.div
          key="cards"
          initial="hidden"
          animate={controlsCards}
          variants={containerVariants}
          ref={cardsInViewRef}
          className="w-[100%] 2xl:w-[80%]"
        >
          <motion.h1 variants={childVariants} className="saddlefit-partnership">
            Saddlefit partnership
          </motion.h1>
          <motion.div
            variants={childVariants}
            className="flex items-center relative"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full  lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>

            <p className="saddlefit_partnership_text !w-full ml-5">
              SaddleFit's experience using technology to design and{" "}
              <br className="2xl:block hidden" /> manufacture better products.
            </p>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <div>
              <p className="saddlefit_partnership_text !w-[90%] ml-5">
                Product design and engineering of saddle trees.
              </p>
              <ul className="saddlefit_partnership_text  list-disc w-full 2xl:!w-[800px] ml-10">
                <li>
                  Design saddle trees based on actual 3D data from our database
                  of horse.
                </li>
                <li>Modular design to reduce costs.</li>
                <li>Eliminate supply chain issues.</li>
                <li>
                  Full control of your intellectual property (saddle tree
                  designs)
                </li>
                <li>
                  Simulation of saddle tree performance to enhance
                  strength,improve durability and reduce weight
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <p className="saddlefit_partnership_text !w-full ml-5">
              Use SaddleFit's proprietary 3D technology on your website
            </p>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <p className="saddlefit_partnership_text !w-full ml-5">
              Use SaddleFit's technology for Cactus saddle fitting events.
            </p>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <p className="saddlefit_partnership_text !w-full ml-5">
              Provide customers with vouchers to get their horse scanned at a
              SaddleFit event <br /> near them.
            </p>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <div>
              <p className="saddlefit_partnership_text !w-[90%] ml-5">
                Support for Saddle Dealer Network
              </p>
              <ul className="saddlefit_partnership_text list-disc w-full 2xl:!w-[800px] ml-10">
                <li>Events at the OEM saddle dealers location</li>
                <li>
                  Vouchers to be used at SaddleFit events then customer
                  purchases saddle from local dealer
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <p className="saddlefit_partnership_text !w-full ml-5">
              Offer your customers saddles that are custom fit to their horse's
              unique size / shape.
            </p>
          </motion.div>
          <motion.hr
            variants={childVariants}
            className="mt-2 w-full 2xl:relative 2xl:top-0 2xl:left-[-100px]"
            style={{ borderColor: "black" }}
          />
          <motion.div
            variants={childVariants}
            className="flex items-center py-2"
          >
            <div className="bg-[#2B364B] h-14 w-14 rounded-full lg:flex hidden justify-center pb-4 pl-2">
              <img src={arrowRight} alt="arrowRight" />
            </div>
            <p className="saddlefit_partnership_text !w-full ml-5">
              Use our database of horses in your research & development of new
              products.
            </p>
          </motion.div>
        </motion.div>
      </div>
      <div ref={firstCardRef}>
        <motion.img
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.5 },
            },
          }}
          src={saddleBigImage}
          alt="saddleBigImage"
          className="absolute w-[800px] h-[800px] 2xl:block hidden bg-transparent z-10 top-7 right-0"
        />
      </div>
    </div>
  );
}

export default ProcessSection;