import React, { useEffect } from "react";
import RideImgSvg from "assets/images/girlBlurImg.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InfoCardData } from "./InfoCardData";

const HowItWorksSection = ({ textInView }) => {
  const { ref: firstCardRef, inView: firstCardInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (firstCardInView) {
      controls.start("visible");
    }
  }, [firstCardInView, controls]);

  return (
    <div className="container mt-[44px] lg:mt-[93px] mx-auto flex">
      <div className="flex text-left w-[90%] xl:w-[40%] 2xl:w-[90%] gap-[31px] justify-center mx-auto">
        <div ref={firstCardRef}>
          <motion.img
            src={RideImgSvg}
            alt="rideImg"
            className="hidden lg:block mb-[160px] !max-w-none"
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
          />
        </div>
        <div className="mx-auto flex flex-wrap justify-center  gap-[20px] w-[80%]">
          {InfoCardData.map((card, index) => (
            <InfoCard
              key={index}
              index={index}
              title={card.title}
              description={card.description}
              number={card.number}
              image={card.stampLogo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ index, title, description, number, image }) => {
  const { ref: cardRef, inView: cardView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (cardView) {
      controls.start("visible");
    }
  }, [cardView, controls]);

  return (
    <motion.div
      ref={cardRef}
      className="relative howItWorksCard px-[46px]  flex gap-[30px] w-[320px] justify-center lg:w-[427px] text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
    >
      {image && (
        <motion.img
          src={image}
          alt="stampImg"
          className="absolute top-[-132px] left-0 right-0 ml-[139px] hidden lg:hidden 2xl:block"
          animate={cardView ? { rotate: 360 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}
      <p className="mt-[-60px] text-[128px] font-bold numbers">{number}</p>
      <div className="flex flex-col gap-[20px]">
        <h4 className="text title w-auto lg:w-[312px]">{title}</h4>
        <p className="text text-[14px] w-[238px] text-[#F7F7F6] lg:w-[318px] description">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default HowItWorksSection;
