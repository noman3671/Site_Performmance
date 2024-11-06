import { useNavigate } from "react-router-dom";
import ArrowForward from "assets/icons/arrow_forward.svg?react";
import CloudThree from "assets/icons/cloudThree.svg?react";
import CloudFour from "assets/icons/cloudFour.svg?react";
import CloudFive from "assets/icons/cloudFive.svg?react";
import mountainlarge from "assets/images/mountainlarge.png";
import mountainMedium from "assets/images/mountainmedium.png";
import mountainSmall from "assets/images/mountainsmall.png";
import CloudSix from "assets/images/CloudSix.png";
import "./style.css";

const NoMatchPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center relative overflow-hidden error-page">
        <div className="relative w-full flex justify-center items-center">
          <img
            src={mountainlarge}
            alt="mountainlarge"
            className="2xl:block bg-cover  hidden fixed  bottom-0 h-[90%] max-w-none !z-20"
          />
          <div className="w-[435px] h-[200px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <h2 className="error404 text-center">Error 404</h2>
            <p className="error-message mt-[24px]">
              Oops! We can’t find that page.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-[200px] mt-[24px] back-btn h-[44px] mx-auto"
            >
              <ArrowForward /> Back to home
            </button>
          </div>
        </div>
        <img
          src={mountainMedium}
          alt="mountainMedium"
          className="2xl:hidden bg-cover hidden md:block  fixed h-[90%] bottom-0 max-w-none"
        />
        <img
          src={mountainSmall}
          alt="mountainSmall"
          className="md:hidden bg-cover block fixed bottom-0  h-[90%] max-w-none "
        />
        <CloudThree className="absolute top-[100px] left-[300px]  2xl:block hidden" />
        <CloudFour className="absolute top-[150px] right-[250px] 2xl:block hidden" />
        <CloudFive className="absolute top-[380px] left-[50px] 2xl:block hidden" />
        <img
          src={CloudSix}
          alt="CloudSix"
          className="absolute top-[650px] right-[260px] 2xl:block hidden z-10"
        />
      </div>
    </>
  );
};
export default NoMatchPage;
