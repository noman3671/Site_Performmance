import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import cactus_saddle from "../../assets/images/cactus_saddle_img.png";
import SelectHorseScore from "../../assets/icons/select_horse_score.svg?react";
import HeartIcon from "../../assets/icons/heart.svg?react";
import "./style.css";
import { Button } from "@aws-amplify/ui-react";
import Gauge from "../Guage/Guage";
import { useLoggedIn } from "context/LoggedInContext";
import { useModalContext } from "context/ModalContext";

function CarouselCards({ items, horses, loading }) {
  const { toggleModal } = useModalContext();
  const { user, setIsAction } = useLoggedIn();
  const [size, setSize] = useState({
    width: "200px",
    height: "90px",
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639) {
        setSize({ width: "200px", height: "90px" });
      } else {
        setSize({ width: "200px", height: "90px" });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    speed: 500,
    variableWidth: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: true,
          centerMode: true,
          className: "center",
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          centerMode: true,
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
          centerMode: true,
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
          centerMode: true,
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
          centerMode: true,
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
          centerMode: true,
          className: "center",
          variableWidth: true,
          autoplay: false,
        },
      },
    ],
  };

  const handleSelectHorse = () => {
    setIsAction("createHorse");
    if (!user) {
      toggleModal("isLoginModalOpen");
    }
  };

  return (
    <>
      {!user || !horses?.length ? (
        <div className="cactus_card-container hide-scroll-bar mt-[-50px] w-full">
          <Slider {...settings}>
            {Array(10)
              .fill()
              .map((_, index) => (
                <div key={index} className="carousel_cards_slider">
                  <div className="flex justify-between">
                    {index === 0 && (
                      <h1 className="cards_pill">Just Arrived</h1>
                    )}
                    <img
                      src={cactus_saddle}
                      alt="cactus_saddle"
                      className={`${
                        index === 0 && "mt-[5px]"
                      } w-[134.097px] h-auto cactus_saddle_image`}
                    />

                    <div className="cactus_text_container w-[204px] h-[202.308px] flex flex-col gap-y-[6.2px]">
                      <div className="flex gap-x-[6.2px]">
                        <div className="cactus_text w-[167px] h-[34px] flex flex-col gap-y-[6.2px]">
                          <p className="cactus_card_title">Cactus Rancher</p>
                          <p className="cactus_card_price">$3,840</p>
                        </div>
                        <div className="heartBtn w-[31.00511px] h-[31.00511px] cursor-pointer">
                          <HeartIcon />
                        </div>
                      </div>
                      <div className="cactus_score_container">
                        <div className="cactus_saddlefit_score_text">
                          What’s Your Saddle Fit Score?
                        </div>
                        <SelectHorseScore
                          onClick={handleSelectHorse}
                          className="select_horse_score_img cursor-pointer"
                        />
                      </div>
                      <div className="gap-x-[6.2px] sm:flex hidden">
                        <abbr className="cactus_add_to_cart">Add to Cart</abbr>
                        <a className="cactus_more_details">More details</a>
                      </div>
                    </div>
                  </div>
                  <div className="mobile_btn_container gap-x-[12px] flex sm:hidden">
                    <Button className="cactus_add_to_cart">Add to Cart</Button>
                    <Button className="cactus_more_details">
                      More details
                    </Button>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-[30px] mt-[-20px] mb-[69px]">
          {user && items?.length > 0 && !loading
            ? items.slice(0, 6).map((item, index) => (
                <div
                  key={`saddle-card-${index}`}
                  className="saddle_cards_container"
                >
                  <div className="flex gap-x-[16px]">
                    {index === 0 && (
                      <h1 className="cards_pill">Just Arrived</h1>
                    )}

                    <img
                      src={cactus_saddle}
                      alt="cactus_saddle"
                      className={`${
                        index === 0 && "mt-[5px]"
                      } w-[108.1px] h-auto sm:w-[173px]`}
                    />
                    <div className="w-[193px] h-auto sm:w-[264px]  flex flex-col gap-y-[8px]">
                      <div className="flex gap-x-[8px]">
                        <div className="w-[216px]  flex flex-col gap-y-[6.2px]">
                          <p
                            title={item?.saddle?.title}
                            className="font-[Montserrat] saddle_title font-[700] h-[42px] sm:h-[52px] overflow-hidden !text-[14px] sm:!text-[18px]"
                          >
                            {item?.saddle?.title}
                          </p>
                          <p className="font-[Montserrat] font-[700] text-[12px] sm:!text-[14px]">{`$${item?.saddle?.price}`}</p>
                        </div>
                        <div className="heartBtn_cards_container w-[50px] h-[35px] sm:w-[40px] sm:h-[40px] cursor-pointer">
                          <HeartIcon />
                        </div>
                      </div>
                      <div className="h-[155px] cactus_score_container">
                        <div className="cactus_saddlefit_score_text sm:block hidden !text-[14px]">
                          Your SaddleFit score
                        </div>
                        <div className="cactus_saddlefit_score_text block sm:hidden !text-[12px]">
                          SaddleFit score
                        </div>
                        <div className="ml-[44px] sm:ml-0 mt-[-20px]">
                          <Gauge
                            style={{
                              width: size.width,
                              height: size.height,
                            }}
                            score={item?.score ?? 0}
                          />
                        </div>
                      </div>
                      <div className="flex btn_container gap-x-[8px]">
                        <Button className="find_score_add_to_cart !w-[128px] !h-[40px]">
                          Add to Cart
                        </Button>
                        <Button className="find_score_more_details !w-[128px] !h-[40px]">
                          More details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:hidden mt-[13px] gap-x-[8px]">
                    <Button className="find_score_add_to_cart !w-[155px] sm:!w-[128px] !h-[40px]">
                      Add to Cart
                    </Button>
                    <Button className="find_score_more_details !w-[155px] sm:!w-[128px] !h-[40px]">
                      More details
                    </Button>
                  </div>
                </div>
              ))
            : items?.length === 0 &&
              !loading && (
                <p className="display_message">
                  No saddles found. Please try adjusting your filter.
                </p>
              )}
        </div>
      )}
    </>
  );
}

export default CarouselCards;
