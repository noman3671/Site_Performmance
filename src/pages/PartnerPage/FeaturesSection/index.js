import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function InViewItem({ elem, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={index}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.4, delay: 0.2 * index }}
      className={`flex mb-[50px] sm:mb-[100px] sm:h-[450px] flex-col justify-center items-center`}
    >
      <div className="relative w-[300px] h-[300px] flex flex-col justify-center items-center shadow-outer rounded-full">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-[#5C80B6] text-[#fff] text-[120px] flex justify-center items-center">
          {elem?.step}
        </div>
      </div>
      <p className={`saddlefit_work_text ${index === 0 && "h-[60px] sm:h-[120px]"} `}>{elem?.title}</p>
    </motion.div>
  );
}

function FeaturesSection({ data }) {

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="saddlefit_work_backgroundImage relative">
        <div className="absolute top-0 left-0 bg-[#2B364B] w-full h-full opacity-80"></div>
        <div className="w-full relative z-10">
          <motion.div
            ref={textRef}
            variants={variants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex py-10 sm:py-0 justify-center items-center">
            <span className="saddlefit_work">How Does</span><span className="work">Saddlefit Work</span><span className="saddlefit_work">?</span>
          </motion.div>
          <div className="flex h-auto w-[95%] mx-auto flex-wrap saddlefit_work_circle justify-around sm:mt-10 items-center">
            {data.map((elem, i) => (
              <InViewItem key={i} elem={elem} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;

