import horseIcon from "assets/images/horseIcon.png";
import storybook from "assets/images/storybook.png";
import trophy from "assets/images/trophy.png";
import meter from "assets/images/meter.png";
import thumb from "assets/images/thumb.png";
import { useScrollContext } from "context/ScrollContext";
import { useEffect, useState } from "react";
import "./style.css";
import VectorImg from "../../../../assets/icons/vector-how-its-work.svg?react";
const HowItWorks = ({ mockData }) => {
  const { refs } = useScrollContext();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={refs.sectionTwoRef}
      className="bg-image relative w-full !min-h-[612px]  md:!min-h-[1004px] overflow-x-hidden overflow-y-hidden"
    >
      <div className="how-it-work-overlay w-full !min-h-[612px]  md:!min-h-[1004px]">
        <div className="z-10 leftVectorImageContainer flex justify-around gap-x-7"></div>

        <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[350px] md:w-[733px] !min-h-[612px] md:!min-h-[934px]">
          <div className="max-w-[733px]   !h-[612px] mt-[40px] md:mt-0 md:!h-[934px] flex justify-around">
            <div className="flex items-center w-auto h-[85%] md:h-full">
              <h1 className="howitswork relative -rotate-180">How it works</h1>
            </div>
            <div className="w-[80%] md:w-[450px] md:mt-[70px] h-[850px] flex flex-col gap-[19px]">
              {mockData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[195px] md:w-[450px] flex justify-center  items-center sm:justify-normal sm:items-start h-[100px]  md:min-h-[154px]"
                  >
                    <div>
                      <p className="font-bold numbers  w-[30px] md:w-[60px] lg:w-[80px] h-full md:h-[154px]  leading-none">
                        {item.number}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col pl-[20px] max-w-[316px]">
                        <h4 className="title w-auto text-start md:w-[312px] leading-none">
                          {item.title}
                        </h4>
                        <p className="text-start w-[160px] sm:max-w-[238px] leading-none mt-[6.2px] md:mt-[12.33px] lg:mt-[16px] text-[#F7F7F6] md:w-[318px] description !flex !flex-wrap">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <VectorImg className="absolute vectorimage md:block hidden md:!h-[174.943px]  lg:!h-[227px] top-0 right-0" />
        <VectorImg className=" absolute vectorimage md:block hidden md:!h-[174.943px]  lg:!h-[227px] top-[450px] right-0" />
        <VectorImg className=" absolute vectorimage md:block hidden md:!h-[174.943px]  lg:!h-[227px] top-[900px] right-0" />
      </div>

      <img
        src={horseIcon}
        alt="horseIcon"
        className="absolute w-[24.794px] h-[24.794px] md:w-[49.323px] md:h-[49.323px] lg:w-[64px] lg:h-[64px] top-[60px] sm:top-[30px] md:top-[120px] right-[20px] md:right-[42.5px] icons lg:right-[300px]"
      />
      <img
        src={storybook}
        alt="storybook"
        className="absolute w-[24.794px] h-[24.794px] md:w-[49.323px] md:h-[49.323px] lg:w-[64px] lg:h-[64px] top-[180px] sm:top-[146px] md:top-[300px] right-[20px] md:right-[42.5px] icons lg:right-[300px]"
      />
      <img
        src={trophy}
        alt="trophy"
        className="absolute w-[24.794px] h-[24.794px] md:w-[49.323px] md:h-[49.323px] lg:w-[64px] lg:h-[64px] top-[295px] sm:top-[265px] md:top-[470px] right-[20px] md:right-[42.5px] icons lg:right-[300px]"
      />
      <img
        src={meter}
        alt="meter"
        className="absolute w-[24.794px] h-[24.794px] md:w-[49.323px] md:h-[49.323px] lg:w-[64px] lg:h-[64px] top-[420px] sm:top-[385px]  md:top-[645px] right-[20px] md:right-[42.5px] icons lg:right-[300px]"
      />
      <img
        src={thumb}
        alt="thumb"
        className="absolute w-[24.794px] h-[24.794px] md:w-[49.323px] md:h-[49.323px] lg:w-[64px] lg:h-[64px] top-[535px] sm:top-[505px] md:top-[815px] right-[20px] md:right-[42.5px] icons lg:right-[300px]"
      />
    </div>
  );
};

export default HowItWorks;
