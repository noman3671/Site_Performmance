import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { gql, useQuery } from "@apollo/client";
import { LIST_GOOGLE_REVIEWS } from "../../../apollo/queries/googleReviews";
import StarIcon from "assets/icons/StarIcon.svg?react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcGoogle } from "react-icons/fc";
import Slider from "react-slick";
import "./style.css";

export const Testimonials = () => {
  const { data } = useQuery(gql(LIST_GOOGLE_REVIEWS));
  const [currentSlide, setCurrentSlide] = useState(0);
  const isCactus = location.pathname === "/cactus";

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const textAnimationControls = useAnimation();

  if (textInView) {
    textAnimationControls.start("visible");
  }

  const settings = {
    className: "center",
    centerMode: data?.listGoogleReviews?.reviews.length > 3 ? true : false,
    infinite: true,
    centerPadding: "60px",
    arrows: false,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    speed: 500,
    variableWidth: true,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,

          infinite: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,
          className: "center",
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,

          infinite: true,
          className: "center",
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,
          className: "center",
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,
          className: "center",
          variableWidth: true,
          autoplay: false,
        },
      },

      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,
          className: "center",
          variableWidth: true,
          autoplay: false,
        },
      },

      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode:
            data?.listGoogleReviews?.reviews.length > 3 ? true : false,
          className: "center",
          variableWidth: true,
          autoplay: false,
        },
      },
    ],
  };


  
  return (
    <div
      className={`flex flex-col w-full relative z-10  ${
        isCactus ? "bg-white" : "cards-container"
      }   m-auto pt-[16.06px] pb-[56.06px]  sm:py-[32px] lg:py-[74px]`}
    >
      <motion.h1
        ref={textRef}
        className={`google_head_text !leading-[43px] ${
          isCactus && "!text-[#2B364B]"
        } mx-auto w-auto text-center text-[#F7F7F6] sm:text-[32px] md:text-[38px] lg:text-[50px]  xl:text-[64px] font-bold uppercase`}
        initial="hidden"
        animate={textAnimationControls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        Here is what saddlefit customers have to say
      </motion.h1>

      {/* <div className="slider-container hide-scroll-bar  w-full xl:mt-10">
        <Slider {...settings}>
          {data?.listGoogleReviews?.reviews?.map((review, index) => (
            <div
              key={index}
              className={`${
                isCactus ? "cactus_card_container" : "card-container"
              }  relative`}
            >
              <div className="flex items-center relative">
                <img
                  src={review.profile_photo_url}
                  alt="Profile"
                  className="profile-image border-[3px] lg:border-[7px] border-gray-300 rounded-full"
                />
                <FcGoogle
                  className={`absolute google-icon !w-[13.717px] !h-[13.717px] sm:!w-[27.336px] sm:!h-[27.336px] xl:!w-[30px] xl:!h-[30px]`}
                />
                <div className="text-container">
                  <h2
                    className={`review-title leading-none user_title__text font-[600] ${
                      isCactus ? "text-[#000]" : "text-white"
                    }`}
                  >
                    {review.author_name}
                  </h2>
                  <div className="rating">
                    <StarIcon className="icon-size h-auto" />
                  </div>
                  <p
                    className={`${
                      isCactus ? "text-[#000]" : "text-[#FFF]"
                    } font-[Montserrat] review-time`}
                  >
                    {review.relative_time_description}
                  </p>
                  <p
                    className={`${
                      isCactus ? "text-[#000]" : "text-[#FFF]"
                    } review-description leading-[120%] user_decs__text`}
                  >
                    {review.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div> */}
    </div>
  );
};
