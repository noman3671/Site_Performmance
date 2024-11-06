import Button from "components/Buttons";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LIST_BANNER } from "apollo/queries/banner";
import { useLoggedIn } from "context/LoggedInContext";
import { Loader } from "@aws-amplify/ui-react";
import LeftVectorIcon from "../../../assets/icons/LeftVectorIcon.svg";
import TopVectorIcon from "../../../assets/icons/TopVectorIcon.svg";
import "./style.css";
import { gql, useQuery } from "@apollo/client";

export const FirstBanner = (type) => {
  const { show, toggle } = useLoggedIn();
  const { loading: isLoading, data: BannerData } = useQuery(gql(LIST_BANNER), {
    variables: { filter: type },
  });

  const bannerItem = BannerData?.listBanner[0];
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: paraRef, inView: paraInView } = useInView();
  const { ref: buttonRef, inView: buttonInView } = useInView();

  const controls = useAnimation();
  const paraControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    if (textInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.2 },
      });
    }
  }, [controls, textInView]);

  useEffect(() => {
    if (paraInView) {
      paraControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.4 },
      });
    }
  }, [paraControls, paraInView]);

  useEffect(() => {
    if (buttonInView) {
      buttonControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.6 },
      });
    }
  }, [buttonControls, buttonInView]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader
          filledColor="#2b364b"
          className="!h-[60px] !flex !items-center !text-center !justify-center"
        />
      </div>
    );
  }

  const handleRedirect = (url) => {
    const formattedUrl = url?.startsWith("http") ? url : `http://${url}`;
    window.open(formattedUrl, "_blank");
  };

  return (
    <div
      className={`relative h-[212.131px] sm:h-[422px] lg:h-[701px] overflow-hidden ${
        show && "-z-30 "
      } `}
    >
      <div className={`relative ${!toggle && "z-10"} `}>
        <img
          src={
            bannerItem?.position === "justify-end"
              ? LeftVectorIcon
              : bannerItem?.position === "justify-start"
              ? LeftVectorIcon
              : bannerItem?.position === "justify-center" && TopVectorIcon
          }
          alt="Banner Image"
          className={`absolute ${
            bannerItem.position === "justify-start" &&
            "top-[-190px] left-[-110px] sm:left-[-150px] sm:top-[-380px] md:left-[-230px] lg:top-[-550px]  lg:left-[-200px]"
          } 
          ${
            bannerItem.position === "justify-end" &&
            "top-[-190px] -rotate-180 right-[-110px] sm:right-[-150px] sm:top-[-380px] md:right-[-230px] lg:top-[-550px]  lg:right-[-200px]"
          }
          ${
            bannerItem?.position === "justify-center" &&
            "top-[-225px] sm:top-[-520px] md:top-[-500px]  lg:top-[-700px] left-[50%] transform translate-x-[-50%]"
          } w-[500px] h-[600px] md:w-[1100px] sm:h-[1200px] lg:w-[1144px] lg:h-[1813.066px]`}
        />
        <div
          className={`w-full h-[100%] flex items-center ${bannerItem?.position}`}
        >
          <div
            className={`w-[130px] sm:!w-[248.273px]  lg:!w-[412px] h-[141px] md:min-h-[100px] lg:min-h-[269px] ${
              bannerItem.position === "justify-start" && "text-start"
            } ${bannerItem.position === "justify-center" && "text-center"} ${
              bannerItem.position === "justify-end" && "text-end"
            }  absolute  ${
              bannerItem?.position === "justify-end"
                ? "right-[20px] md:right-[50px] lg:right-[80px] top-[55px] sm:top-[165px] md:top-[150px] lg:top-[200px]  md:mx-2 lg:mx-20"
                : bannerItem?.position === "justify-start"
                ? "left-[20px] md:left-[50px] lg:left-[80px] top-[55px] sm:top-[165px] md:top-[150px] lg:top-[200px]   md:mx-2 lg:mx-20"
                : bannerItem?.position === "justify-center"
                ? "top-[15px] sm:top-[20px] md:top-[40px] lg:top-[30px] h-[141px] md:min-h-[100px] lg:min-h-[269px] !w-[160px] sm:!w-[140px] md:!w-[248.273px] lg:!w-[480px]"
                : ""
            } ${!toggle && "z-10"} h-auto `}
          >
            <motion.h1
              ref={textRef}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              className={`context_text w-full h-auto max-h-[180px] ${
                bannerItem.position === "justify-center" &&
                "text-[16px] sm:text-[18px] lg:text-[64px]"
              } text-[16px] sm:text-[18px] lg:text-[64px]`}
            >
              {bannerItem?.contentHead}
            </motion.h1>
            <motion.h1
              ref={textRef}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              className={`video_content_para  w-full   ${
                bannerItem.position === "justify-center" &&
                "!text-[10px] md:!text-[12px] lg:!text-[14px] w-full sm:w-[140px] md:!w-[130px] lg:!w-[250px] xl:!w-[280px] mx-auto 2xl:!w-[412px]"
              }  mt-[5px] h-[45px] sm:h-[48px] md:h-[62px] text-[10px] md:!text-[14px]`}
            >
              {bannerItem?.contentDescription}
            </motion.h1>
            <motion.div
              className={`flex ${
                bannerItem.position === "justify-start" && "justify-start"
              } ${
                bannerItem.position === "justify-center" && "justify-center"
              } ${
                bannerItem.position === "justify-end" && "justify-end"
              }  items-center`}
              ref={buttonRef}
              initial={{ opacity: 0, y: 50 }}
              animate={buttonControls}
            >
              <Button
                onClick={() => handleRedirect(bannerItem?.btnUrl)}
                whiteOutline
                className={`video_contents_btn !w-[80px] sm:!w-[100px] md:!w-[120px]  lg:!w-[185px]  text-[#fff] !text-[8px] md:!text-[10px] lg:!text-[16px] sm:px-[20px] !h-[30px] md:!h-[40px] lg:!h-[56px] ${
                  bannerItem.position === "justify-center"
                    ? "!text-[8px] md:!text-[10px] lg:!text-[16px] lg:!mt-[15px] mt-2"
                    : "text-[20px] mt-2 lg:mt-[45px]"
                } `}
              >
                <span className="banner_btn">{bannerItem?.contentBtn}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="main">
        {bannerItem?.video ? (
          <video src={bannerItem?.video} autoPlay loop muted />
        ) : (
          <img
            alt="banner_image"
            src={bannerItem?.image}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div
        style={{ background: bannerItem?.overlayColor }}
        className={`content absolute opacity-45 top-0 left-0 w-full h-full`}
      ></div>
    </div>
  );
};
