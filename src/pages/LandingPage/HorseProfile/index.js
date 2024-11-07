import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "components/Buttons";
import { useScrollContext } from "context/ScrollContext";
import mapCard from "assets/images/mapImg.svg";
import stars_image from "assets/icons/star_img.svg";
import horseProfileLogo from "assets/images/logoBgImg.svg";
import horseProfile from "assets/images/horse-profile.svg";
import PlusIcon from "assets/icons/plus.svg?react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoggedIn } from "context/LoggedInContext";
import { useModalContext } from "context/ModalContext";

const YoutubeModal = ({ videoId, onClose }) => {
  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed bg-transparent w-full inset-0 flex items-center justify-center z-20"
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

export const HorseProfile = () => {
  const { refs } = useScrollContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, show } = useLoggedIn();
  const { toggleModal } = useModalContext();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSignUpHandler = async () => {
    navigate("/signup", {
      state: { backgroundLocation: location },
    });
  };

  const mapControls = useAnimation();
  const clayControls = useAnimation();
  const plusIconRef = useRef(null);
  const controls = useAnimation();
  const plusIconControls = useAnimation();

  const { ref: mapRef, inView: mapInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: clayRef, inView: clayInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (mapInView) {
      mapControls.start("visible");
    }
  }, [mapInView, mapControls]);

  useEffect(() => {
    if (clayInView) {
      clayControls.start("visible");
    }
  }, [clayInView, clayControls]);

  const mapVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const clayVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  const { ref: descriptionRef, inView: descriptionInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (descriptionInView) {
      controls.start("visible");
    }
  }, [descriptionInView, controls]);

  // Use useInView to detect when the plus icon comes into view
  const { ref: plusIconInViewRef, inView: plusIconInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Use useAnimation to control the animation of the plus icon

  // Use useEffect to trigger the animation when the plus icon is in view
  useEffect(() => {
    if (plusIconInView) {
      plusIconControls.start("visible");
    }
  }, [plusIconInView, plusIconControls]);

  // Define animation variants for the fade-up effect
  const plusIconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <>
      <div
        ref={refs.sectionThreeRef}
        className={`prof_main  overflow-hidden relative ${show && "-z-30"}`}
      >
        <img
          src={horseProfileLogo}
          alt="horse_profile_logo"
          className="horse_profile_logo"
        />

        <div className="absolute flex mt-[40px] lg:mt-0 xl:mt-10 flex-col w-[84%] justify-center items-center top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] h-auto xl:min-h-[480px] xl:flex-row-reverse">
          <div className="relative ml-10 xl:ml-[200px] flex">
            <motion.img
              className="w-[231.865px] h-[173.304px] md:w-[388.935px] md:h-[290.703px] xl:w-[570.106px] xl:h-[426.116px]"
              ref={mapRef}
              src={mapCard}
              alt="map-card"
              initial="hidden"
              animate={mapControls}
              variants={mapVariants}
            />
            <motion.div
              ref={clayRef}
              initial="hidden"
              animate={clayControls}
              variants={clayVariants}
              className="clay-card"
            >
              <h1 className="profile_title_text">Horse profile</h1>
              <div className="prof_card_head">
                <h1 className="clay-card-text">Clay</h1>
                <img
                  src={horseProfile}
                  alt="horseProfile"
                  className="horse_prof_img"
                />
              </div>
              <div className="prof_card_border" />
              <div className="prof-schedule">
                <div>
                  <h4>JAN 1, 2023</h4>
                  <p>Date of Birth</p>
                </div>
                <div>
                  <h4>FEB 5, 2024</h4>
                  <p>Last scan</p>
                </div>
              </div>
              <div className="decor_icon" />
              <div className="plus_decor_icon" ref={plusIconInViewRef}>
                <PlusIcon />
              </div>
            </motion.div>
          </div>
          <div
            ref={descriptionRef}
            className="prof_description mt-[41px] xl:mt-[-32px] flex lg:justify-center xl:justify-end items-center"
          >
            {/* <motion.img
              src={stars_image}
              alt="stars"
              className="md:w-auto md:h-auto w-[303px] h-[33px]"
              initial="hidden"
              animate={controls}
              variants={variants}
            /> */}
            <motion.img
              src={stars_image}
              alt="stars"
              width="303"
              height="33"
              className="md:w-auto md:h-auto w-[303px] h-[33px]"
              initial="hidden"
              animate={controls}
              variants={variants}
            />

            <motion.h1
              className="text-center xl:!text-end"
              initial="hidden"
              animate={controls}
              variants={variants}
            >
              Ready to scan your horse or saddle?
            </motion.h1>
            <div className="flex relative sm:flex-row sm:w-full w-full max-w-[259px] justify-center xl:justify-end md:flex-row flex-col items-center mt-[20px] lg:mt-[24px] sm:gap-[24px] gap-[8px]">
              <motion.div
                initial="hidden"
                className="sm:w-[259px] w-[325px]"
                animate={controls}
                variants={buttonVariants}
              >
                <Button
                  size
                  onClick={() => {
                    user ? navigate("/event") : onSignUpHandler();
                  }}
                  className="prof_btn_join"
                  tranparent
                >
                  Schedule Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <YoutubeModal videoId="YOUR_VIDEO_ID_HERE" onClose={closeModal} />
      )}
    </>
  );
};
