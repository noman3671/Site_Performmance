import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import alignmentClasses from "utils/landing_page.json";

export const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const controlsScan = useAnimation();
  const controlsFit = useAnimation();
  const controlsPerform = useAnimation();
  const {
    content_head_first,
    content_head_second,
    content_head_third,
    content_description,
  } = alignmentClasses;
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const screenSize = window.innerWidth;

  const [screenResize, setScreenResize] = useState(screenSize);

  const detectSize = () => {
    setScreenResize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  useEffect(() => {
    const sequence = async () => {
      // Show the main content immediately
      await controlsScan.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay: 0 },
      });
      // Load animations for other elements after a slight delay
      await controlsFit.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: 0.1 },
      });
      await controlsPerform.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: 0.1 },
      });
    };
    sequence();
  }, [controlsScan, controlsFit, controlsPerform]);

  return (
    <div
      className={`flex px-[22px] sm:px-2 xl:px-10 2xl:px-0 w-[95%] pb-[100px] xl:max-w-[1300px] mx-auto justify-normal`}
    >
      <div className="md:w-auto w-full md:mx-0 mx-auto items-center flex flex-col md:items-start">
        <div className="head_text flex md:text-start sm:text-center sm:flex-col md:flex-col m-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={controlsScan}
            className="block sm:leading-[90px] md:leading-[132px]"
          >
            {content_head_first}
          </motion.span>
          <div className="flex sm:flex-row md:flex-col">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={controlsFit}
              className="block sm:leading-[90px] md:leading-[132px]"
            >
              {content_head_second}
            </motion.span>
            {/* <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={controlsPerform}
              className="block sm:leading-[90px] md:leading-[132px]"
            >
              {content_head_third}
            </motion.span> */}
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0, y: 70 }}
          animate={controlsScan}
          className="perf_saddle_text min-h-[44.554px]"
        >
          {content_description}
        </motion.span>
        <motion.div
          className="flex justify-center mt-[9px] lg:justify-start"
          initial={{ opacity: 0, y: 80 }}
          animate={controlsScan}
        ></motion.div>
      </div>
      <div className="btm_gradient" />
    </div>
  );
};
