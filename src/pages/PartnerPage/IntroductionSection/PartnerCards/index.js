import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import branding_saddle from "assets/icons/branding_saddle.svg";
import branding_screen from "assets/icons/branding_screen.svg";
import brand_horse from "assets/icons/brand_horse.svg";

function PartnerCards() {
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

  const brandingData = [
    {
      id: 1,
      backgroundColor: "#2B364B",
      image: branding_saddle,
      heading: "UNMATCHED PRECISION",
      text: "Experience precision with every ride. Our saddles enhance your connection with your horse, ensuring superior comfort and performance.",
    },
    {
      id: 2,
      backgroundColor: "#5C80B6",
      image: branding_screen,
      heading: "INNOVATIVE TECHNOLOGY",
      text: "Leveraging advanced technology for Bestsaddle fit, we optimize the harmony between rider and horse for peak performance.",
    },
    {
      id: 3,
      backgroundColor: "#2B364B",
      image: brand_horse,
      heading: "Recommendations",
      text: "Using 3D measurements, we ensure the Bestsaddle fit by capturing gullet height, width, bar angles, and length for optimal comfort.",
    },
  ];

  return (
    <motion.div
      key="cards"
      initial="hidden"
      animate={controlsCards}
      variants={containerVariants}
      ref={cardsInViewRef}
      className="flex flex-wrap justify-center relative gap-y-10 2xl:gap-y-0  2xl:mt-[-220px] gap-x-[100px] xl:gap-x-[150px] 2xl:gap-x-[140px]"
    >
      {brandingData.map((item) => (
        <motion.div
          key={item.id}
          variants={childVariants}
          className="w-[339.322px] sm:w-[359.322px] rounded-[9px] h-[400px] sm:h-[511.689px]"
          style={{ backgroundColor: item.backgroundColor }}
        >
          <img
            src={item.image}
            className="w-[200px] h-[200px] sm:w-auto sm:h-auto mx-auto py-10"
            alt={item.heading}
          />
          <p className="branding_card_heading">{item.heading}</p>
          <p className="branding_text mt-[32.76px] w-[213.214px] mx-auto">
            {item.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PartnerCards;
