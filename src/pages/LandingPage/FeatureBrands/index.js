import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FastMarquee from "react-fast-marquee";
import feature_brand1 from "assets/images/feature_brand_image1.png";
import feature_brand2 from "assets/images/feature_brand_image2.png";
import feature_brand3 from "assets/images/feature_brand_image3.png";
import feature_brand4 from "assets/images/feature_brand_image4.png";
import feature_brand5 from "assets/images/feature_brand_image5.png";
import feature_brand6 from "assets/images/feature_brand_image6.png";
import feature_brand7 from "assets/images/feature_brand_image7.png";
import feature_brand8 from "assets/images/feature_brand_image8.png";

import "./style.css";

export const FeaturedBrands = () => {
  const navigate = useNavigate();
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const images = [
    feature_brand1,
    feature_brand2,
    feature_brand3,
    feature_brand4,
    feature_brand5,
    feature_brand6,
    feature_brand7,
    feature_brand8,
    feature_brand1,
    feature_brand2,
    feature_brand3,
    feature_brand4,
    feature_brand5,
    feature_brand6,
    feature_brand7,
    feature_brand8,
    feature_brand1,
    feature_brand2,
    feature_brand3,
    feature_brand4,
    feature_brand5,
    feature_brand6,
    feature_brand7,
    feature_brand8,
    feature_brand1,
    feature_brand2,
    feature_brand3,
    feature_brand4,
    feature_brand5,
    feature_brand6,
    feature_brand7,
    feature_brand8
  ];

  const handleImageClick = () => {
    navigate("/partner");
  };

  return (
    <div className="bg-[#2B364B] py-5 w-full min-h-[307.042px]">
      <div>
        <h1 className="feature_brand text-[40px] lg:text-[64px] w-full text-center">
          Featured Brands
        </h1>
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="scrollable-card-section_feature_brand flex gap-3 mt-3"
        >
          <FastMarquee  pauseOnHover={true} speed={50}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={handleImageClick}
                className="cursor-pointer  pl-12"
                alt={`Brand ${index + 1}`}
                variants={itemVariants}
              />
            ))}
          </FastMarquee>
        </motion.div>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};
