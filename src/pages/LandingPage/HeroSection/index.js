import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import alignmentClasses from "utils/landing_page.json";
import Button from "components/Buttons";

const YoutubeModal = ({ onClose }) => {
  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed bg-transparent h-100vh w-full inset-0 flex items-center justify-center z-20"
      onClick={handleCloseModal}
    >
      <div ref={modalRef} className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <iframe
          className="w-[300px] h-[250px] md:w-[1080px] md:h-[700px]"
          src="https://www.youtube.com/embed/TDT-_4wcV7c?si=VWzs35CLfert5p4L"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

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
    content_btn,
    video,
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
      await controlsScan.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.6 },
      });
      await controlsFit.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
      await controlsPerform.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
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
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={controlsPerform}
              className="block sm:leading-[90px] md:leading-[132px]"
            >
              {content_head_third}
            </motion.span>
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
