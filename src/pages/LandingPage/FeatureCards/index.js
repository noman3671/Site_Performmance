import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollContext } from "context/ScrollContext";
import RightSideBgImg from "assets/images/right-side-bg.png";
import TopSideBgImg from "assets/images/top-side-bg.png";
import HowItWorksSection from "./HowItWorks";
import { featureCardData } from "./FeatureCardData";
import { FeatureCard } from "./FeatureCard";

import "./style.css";

const mockData = [
  {
    number: 1,
    title: "Scan Your Horse",
    description: "Get your horse 3D scanned at a SaddleFit event near you.",
    large: 90,
    small: 90,
  },
  {
    number: 2,
    title: "Scan Your Saddle",
    description:
      "We 3D scan your saddle to see how well it fits your horse using SaddleFit.",
    large: 280,
    small: 180,
  },
  {
    number: 3,
    title: "Get Your SaddleFit Score",
    description:
      "Your SaddleFit score is an easy-to-understand 0-100 score based on how well your saddle fits your horse.",
    large: 480,
    small: 280,
  },
  {
    number: 4,
    title: "SaddleFit Marketplace",
    description:
      "Take the guesswork out of finding the best fitting saddle for your horse by shopping on the SaddleFit marketplace.",
    large: 680,
    small: 380,
  },
  {
    number: 5,
    title: "Peace of Mind",
    description:
      "SaddleFit provides you with peace of mind knowing you have the best fitting saddle.",
    large: 880,
    small: 480,
  },
];

export const FeatureCards = () => {
  const { refs } = useScrollContext();
  const controlsHeading = useAnimation();
  const controlsCards = useAnimation();
  const [headingInViewRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsInViewRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (headingInView) {
      controlsHeading.start("visible");
    }
  }, [controlsHeading, headingInView]);

  useEffect(() => {
    if (cardsInView) {
      controlsCards.start("visible");
    }
  }, [controlsCards, cardsInView]);

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.5 } },
  };

  const cardsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div ref={refs.sectionOneRef} className={`cards_main relative`}>
        <img
          className="absolute hidden lg:block top-0 -z-10 left-0"
          src={TopSideBgImg}
          alt="topSideBg"
        />
        <motion.h1
          className="card_head_text"
          variants={headingVariants}
          initial="hidden"
          animate={controlsHeading}
          transition={{ delay: 0.4 }}
          ref={headingInViewRef}
        >
          Why use saddlefit
        </motion.h1>
        <div className="why-use-cards_wrapper mb-[24px] md:mb-[24.04px] lg:mb-[72px]">
          <div className="border_btm_dsh"></div>
          <div className="Mb_border_dsh"></div>
          <motion.div
            className={`cards_wrapper relative`}
            key="cards"
            initial="hidden"
            animate={controlsCards}
            variants={cardsVariants}
            ref={cardsInViewRef}
          >
            {featureCardData.map((card, index) => (
              <motion.div
                key={index}
                style={{ display: "inline-block" }}
                variants={cardItemVariants}
              >
                <FeatureCard
                  index={index}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  delay={index * 0.2}
                  className="card"
                />
              </motion.div>
            ))}
            <img
              className="absolute hidden lg:block 2xl:right-0 bottom-[-200px] -z-10"
              src={RightSideBgImg}
              alt="rightSideBg"
            />
          </motion.div>
        </div>
      </div>
      <div>
        <HowItWorksSection mockData={mockData} />
      </div>
    </>
  );
};

export default FeatureCard;
