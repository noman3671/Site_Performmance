import Button from "components/Buttons";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LIST_BANNER } from "apollo/queries/banner";
import { useLoggedIn } from "context/LoggedInContext";
import { Loader } from "@aws-amplify/ui-react";
import TopVectorIcon from "../../../assets/icons/TopVectorIcon.svg";
import {
  LeftBanner,
  RightBanner,
  MobileLeftVideoBanner,
  MobileRightVideoBanner,
} from "./Banners";
import VectorTransparent from "../../../assets/icons/vectorTransparent.svg";
import "./style.css";
import { gql, useQuery } from "@apollo/client";

export const SecondBanner = (type) => {
  const { show, toggle } = useLoggedIn();
  const { loading: isLoading, data: BannerData } = useQuery(gql(LIST_BANNER), {
    variables: { filter: type },
  });
  const bannerItem = BannerData?.listBanner[1];
  const { ref: textRef, inView: textInView } = useInView();
  const { inView: paraInView } = useInView();
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
      className={`relative h-[300px] sm:h-[345px] lg:h-[701px] ${
        bannerItem.position === "justify-center" && "overflow-hidden"
      } bannerContainer sm:overflow-hidden`}
    >
      {bannerItem.position === "justify-end" && (
        <div>
          <RightBanner className="relative" mediaUrl={bannerItem} />

          {bannerItem.image && (
            <img
              className="absolute right-[-155px] sm:block hidden rightArrowIcon top-[-100px]  rotate-90 sm:rotate-0  sm:top-[-220px] sm:right-[-95px] md:right-[15px] lg:top-[-330px] lg:right-[-145px] xl:top-[-700px]   xl:right-[-250px] 2xl:right-[-250px]  w-[400px] h-[400px] sm:h-[800px] lg:h-[1300px]  sm:w-auto xl:h-auto"
              src={VectorTransparent}
            />
          )}

          <div className="sm:hidden block absolute  top-[-50px] right-0">
            {bannerItem.image && (
              <svg
                width="375"
                height="298"
                viewBox="0 0 375 298"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="clip0_6001_11044">
                    <path d="M172.258 610.376C108.064 666.46 73.3942 460.935 55.0529 490.541L-89.9995 490.541C-78.3684 452.891 -40.0085 370.887 85.6962 261.177C150.226 204.869 178.633 153.031 201.447 111.47C215.427 85.9979 227.506 63.9888 244.952 45.3314C270.115 18.5182 301.43 4.99996 338.001 4.99996C374.571 4.99997 405.997 18.63 431.049 45.3314C448.495 63.9888 460.574 85.9979 474.553 111.47C497.368 153.031 525.775 204.869 590.305 261.177C716.009 370.887 754.369 452.891 766 490.541L620.948 490.541C602.607 460.935 567.937 666.46 503.743 610.376C421.543 538.651 408.793 740.643 383.965 695.284C377.367 683.218 368.756 667.465 362.828 659.533C356.901 667.577 348.401 683.218 341.691 695.284C316.863 740.643 254.458 538.762 172.258 610.376Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#clip0_6001_11044)">
                  <image
                    width="1280"
                    height="720"
                    preserveAspectRatio="xMidYMid slice"
                    href={bannerItem.image}
                  />
                </g>

                <path
                  d="M503.743 359.146C567.937 415.052 602.607 459.488 620.948 489L766 489C754.369 451.469 716.01 369.726 590.305 260.364C525.775 204.235 497.368 152.561 474.554 111.133C460.574 85.7409 448.495 63.8017 431.049 45.2034C405.885 18.4754 374.571 5 338 5C301.43 5 270.004 18.5868 244.952 45.2034C227.506 63.8017 215.427 85.7409 201.448 111.133C178.633 152.561 150.226 204.235 85.6963 260.364C-40.0084 369.726 -78.3685 451.469 -89.9995 489L55.0531 489C73.3943 459.488 108.064 415.052 172.258 359.146C254.458 287.649 292.036 219.381 316.863 174.166C323.462 162.138 332.073 146.436 338 138.529C343.928 146.547 352.428 162.138 359.138 174.166C383.966 219.381 421.543 287.76 503.743 359.146Z"
                  fill="white"
                  fillOpacity="0.54"
                />
                <path
                  d="M-89.6633 488.752C-77.9295 451.13 -39.4609 369.578 85.8588 260.551C150.325 204.477 178.761 152.842 201.561 111.439L201.664 111.252C215.647 85.8549 227.711 63.9443 245.133 45.3728C270.137 18.806 301.498 5.24753 338 5.24753C374.503 5.24753 405.752 18.6948 430.868 45.3728C448.29 63.9443 460.354 85.8549 474.337 111.252L474.554 111.133L474.337 111.252L474.44 111.439C497.241 152.842 525.676 204.477 590.142 260.551C715.462 369.578 753.93 451.13 765.664 488.752L621.086 488.752C602.711 459.216 568.031 414.806 503.905 358.96L503.743 359.146L503.905 358.959C421.739 287.603 384.179 219.255 359.355 174.047L359.354 174.045C358.649 172.781 357.923 171.477 357.183 170.146C350.887 158.827 343.514 145.571 338.2 138.382L338.002 138.114L337.802 138.38C331.876 146.286 323.282 161.951 316.694 173.96L316.646 174.047C291.822 219.255 254.262 287.491 172.096 358.96L172.258 359.146L172.096 358.96C107.97 414.806 73.2906 459.216 54.9155 488.752L-89.6633 488.752ZM338.154 138.737C343.446 145.958 350.729 159.052 356.967 170.267C357.707 171.598 358.432 172.902 359.138 174.166L338.154 138.737Z"
                  stroke="white"
                  strokeOpacity="0.08"
                  strokeWidth="0.495054"
                />
              </svg>
            )}

            {bannerItem.video && (
              <MobileRightVideoBanner videoUrl={bannerItem.video} />
            )}
          </div>
        </div>
      )}

      {bannerItem.position === "justify-start" && (
        <div>
          <LeftBanner className="child-container" mediaUrl={bannerItem} />

          <div className="sm:hidden block absolute  top-0 left-0">
            {bannerItem.image && (
              <svg
                width="375"
                height="298"
                viewBox="0 0 375 298"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6001_10879)">
                  <path
                    d="M202.742 610.376C266.937 666.46 301.606 460.935 319.948 490.541L465 490.541C453.369 452.891 415.009 370.887 289.304 261.177C224.774 204.869 196.368 153.031 173.553 111.47C159.573 85.9979 147.495 63.9888 130.048 45.3314C104.885 18.5182 73.5706 4.99996 37 4.99996C0.429291 4.99997 -30.9969 18.63 -56.0484 45.3314C-73.4949 63.9888 -85.5733 85.9979 -99.5529 111.47C-122.368 153.031 -150.774 204.869 -215.304 261.177C-341.009 370.887 -379.369 452.891 -391 490.541L-245.947 490.541C-227.606 460.935 -192.937 666.46 -128.742 610.376C-46.5422 538.651 -33.7928 740.643 -8.96497 695.284C-2.36658 683.218 6.2449 667.465 12.1723 659.533C18.0996 667.577 26.5993 683.218 33.3095 695.284C58.1373 740.643 120.542 538.762 202.742 610.376Z"
                    fill="url(#pattern0_6001_10879)"
                  />
                  <path
                    d="M-128.742 360.146C-192.937 416.052 -227.606 460.488 -245.948 490L-391 490C-379.369 452.469 -341.009 370.726 -215.304 261.364C-150.774 205.235 -122.368 153.561 -99.553 112.133C-85.5734 86.7409 -73.4949 64.8017 -56.0483 46.2034C-30.885 19.4754 0.429321 6 37 6C73.5707 6 104.997 19.5868 130.048 46.2034C147.495 64.8017 159.573 86.7409 173.553 112.133C196.368 153.561 224.774 205.235 289.304 261.364C415.009 370.726 453.369 452.469 465 490L319.947 490C301.606 460.488 266.937 416.052 202.742 360.146C120.542 288.649 82.9649 220.381 58.1371 175.166C51.5388 163.138 42.9274 147.436 37 139.529C31.0726 147.547 22.5729 163.138 15.8627 175.166C-8.96509 220.381 -46.5423 288.76 -128.742 360.146Z"
                    fill="white"
                    fill-opacity="0.54"
                  />
                  <path
                    d="M464.664 489.752C452.93 452.13 414.461 370.578 289.142 261.551C224.675 205.477 196.24 153.843 173.439 112.44L173.336 112.252C159.353 86.8549 147.289 64.9443 129.868 46.3728C104.863 19.806 73.5023 6.24753 37 6.24753C0.497467 6.24753 -30.7517 19.6948 -55.8678 46.3728C-73.2894 64.9443 -85.3535 86.8549 -99.3362 112.252L-99.553 112.133L-99.3362 112.252L-99.4391 112.439C-122.24 153.842 -150.675 205.477 -215.142 261.551C-340.462 370.578 -378.93 452.13 -390.664 489.752L-246.085 489.752C-227.71 460.216 -193.03 415.806 -128.905 359.96L-128.742 360.146L-128.905 359.959C-46.7385 288.603 -9.17831 220.255 15.6457 175.047L15.6465 175.045C16.3521 173.781 17.0777 172.476 17.8181 171.145C24.1139 159.826 31.4865 146.571 36.801 139.382L36.9986 139.114L37.1981 139.38C43.1243 147.286 51.7184 162.951 58.3062 174.96L58.3541 175.047C83.1781 220.255 120.738 288.491 202.905 359.96L202.742 360.146L202.905 359.96C267.03 415.806 301.71 460.216 320.085 489.752L464.664 489.752ZM36.8467 139.737C31.5547 146.958 24.2718 160.052 18.034 171.266C17.2938 172.597 16.5684 173.901 15.8627 175.166L36.8467 139.737Z"
                    stroke="white"
                    stroke-opacity="0.08"
                    stroke-width="0.495054"
                  />
                </g>
                <defs>
                  <pattern
                    id="pattern0_6001_10879"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      href="#image0_6001_10879"
                      transform="matrix(-0.000477947 -1.0252e-10 0 0.000587341 0.846963 -0.0021143)"
                    />
                  </pattern>
                  <clipPath id="clip0_6001_10879">
                    <rect
                      width="375"
                      height="298"
                      fill="white"
                      transform="matrix(-1 0 0 1 375 0)"
                    />
                  </clipPath>

                  <image
                    id="image0_6001_10879"
                    width="1280"
                    height="720"
                    preserveAspectRatio="xMidYMid slice"
                    href={bannerItem.image}
                  />
                </defs>
              </svg>
            )}

            {bannerItem.video && (
              <MobileLeftVideoBanner videoUrl={bannerItem.video} />
            )}
          </div>

          {/* <div
            style={{ background: bannerItem?.overlayColor }}
            className={`content absolute opacity-45 top-0 left-0 w-full h-full`}
          ></div> */}
        </div>
      )}

      <div className="bg-[#FBFBFB]">
        {bannerItem?.position === "justify-center" && bannerItem?.video && (
          <video src={bannerItem?.video} autoPlay loop muted />
        )}

        {bannerItem?.position === "justify-center" && bannerItem?.image && (
          <img
            src={bannerItem?.image}
            alt="bg-image"
            className="w-full h-full object-cover"
          />
        )}

        {bannerItem.position === "justify-center" && (
          <>
            <img
              src={TopVectorIcon}
              alt="Banner Image"
              className={`absolute top-[-225px] z-10 md:top-[-500px] lg:top-[-700px] left-[50%] transform translate-x-[-50%]
          w-[500px] h-[600px] md:w-[1100px] md:h-[1200px] lg:w-[1144px] lg:h-[1813.066px]`}
            />
            <div
              style={{ background: bannerItem?.overlayColor }}
              className={`content absolute opacity-45 top-0 left-0 w-full h-full`}
            ></div>
          </>
        )}

        <div
          className={`w-full h-[100%] flex items-center ${bannerItem?.position}`}
        >
          <div
            className={`w-[130px] 
               sm:!w-[248.273px]  lg:!w-[412px]
              h-[141px] md:min-h-[100px] lg:min-h-[269px] ${
                bannerItem.position === "justify-end" && "text-start"
              } ${
              bannerItem.position === "justify-center" &&
              "text-center w-[120px] sm:!w-[100px] md:!w-[412px] lg:!w-[400px] xl:!w-[480px]"
            } ${
              bannerItem.position === "justify-start" && "text-end"
            }  absolute  ${
              bannerItem?.position === "justify-start"
                ? "right-[20px] md:right-[10px] xl:right-[80px] top-[80px]  sm:top-[110px] lg:top-[200px] mx-5 xl:mx-0"
                : bannerItem?.position === "justify-end"
                ? "left-[20px] md:left-[10px] xl:left-[80px] top-[80px] sm:top-[110px] lg:top-[200px] mx-5 xl:mx-0"
                : bannerItem?.position === "justify-center"
                ? "top-[15px] sm:top-[20px] md:top-[40px] lg:top-[30px] h-[141px] md:min-h-[100px] lg:min-h-[269px] !w-[160px] sm:!w-[140px] md:!w-[148.273px] lg:!w-[480px]"
                : ""
            } ${!toggle && "z-10"} h-auto `}
          >
            <motion.h1
              ref={textRef}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              className={`context_text h-auto ${
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
              className={`video_content_para  w-full mt-[5px] h-[45px] sm:h-[48px] md:h-[62px] text-[10px] md:!text-[14px] ${
                bannerItem.position === "justify-center" &&
                "!text-[10px] md:!text-[12px] lg:!text-[14px] 2xl:!text-[14px] w-full sm:w-[140px] md:!w-[130px] lg:!w-[250px] xl:!w-[280px] mx-auto 2xl:!w-[412px]"
              }`}
            >
              {bannerItem?.contentDescription}
            </motion.h1>

            <motion.div
              className={`flex ${
                bannerItem.position === "justify-end" && "justify-start"
              } ${
                bannerItem.position === "justify-center" && "justify-center"
              } ${
                bannerItem.position === "justify-start" && "justify-end"
              }  items-center`}
              ref={buttonRef}
              initial={{ opacity: 0, y: 50 }}
              animate={buttonControls}
            >
              <Button
                onClick={() => handleRedirect(bannerItem?.btnUrl)}
                whiteOutline
                className={`video_contents_btn !w-[80px] sm:!w-[100px] md:!w-[120px]  lg:!w-[185px] text-[#fff] !text-[8px] md:!text-[10px] lg:!text-[16px] sm:px-[20px] !h-[40px] md:!h-[40px] lg:!h-[56px] ${
                  bannerItem.position === "justify-center"
                    ? "!text-[5px] lg:!mt-[15px] mt-2"
                    : "text-[20px] mt-2 lg:mt-[45px]"
                } `}
              >
                <span className="banner_btn">{bannerItem?.contentBtn}</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      {/* <div
        style={{ background: bannerItem?.overlayColor }}
        className={`content absolute opacity-45 top-0 left-0 w-full h-full`}
      ></div> */}
    </div>
  );
};
