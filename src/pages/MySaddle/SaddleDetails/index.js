import "./style.css";
import React, { useEffect, useState } from "react";
import saddleimg1 from "assets/images/detailMainImage.png";
import saddleimg2 from "assets/images/detailMainImage2.png";
import saddleimg3 from "assets/images/detailMainImage3.png";
import saddleimg4 from "assets/images/detailMainImage4.png";
import saddleimg5 from "assets/images/detailMainImage5.png";
import Button from "components/Buttons";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import ArrowDownIcon from "assets/icons/arrow-down.svg?react";
import VectorlineIcon from "assets/icons/Vectorline.svg?react";
import RightArrowIcon from "assets/icons/chevron-right.svg?react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "context/CartContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Loader } from "@aws-amplify/ui-react";
import { GET_SADDLE_DETAIL } from "apollo/queries/saddles";
import { getItemFromStorage, setItemInStorage } from "utils/localStorage";
import { SADDLE_CHECKOUT } from "apollo/mutations/saddle";
import { useLoggedIn } from "context/LoggedInContext";
import { useSaddleContext } from "context/SaddleContext";
import Gauge from "components/Guage/Guage";
import { useActionsContext } from "context/ActionsContext";
import ShoppingCartModal from "components/Modal/ShoppingCart";
import { useModalContext } from "context/ModalContext";
import { listUserHorses } from "apollo/queries/horses";
import { createToast } from "utils/Toast";

const Toast = createToast();

export const SaddleDetails = () => {
  const { cartData, setCartData, addToCartLoading, userCartData, ADD_TO_CART } =
    useCartContext();
  const { toggleModal, closeModal } = useModalContext();
  const { actionState, changeActionState } = useActionsContext();

  const [isLoading, setIsLoading] = useState(false);
  const { state: locationState } = useLocation();
  const params = useParams();
  const { state } = useSaddleContext();

  const navigate = useNavigate();
  const { user } = useLoggedIn();
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [isSaddleFitReportShown, setIsSaddleFitReportShown] = useState(false);
  const [isSaddleFitReportChecked, setIsSaddleFitReportChecked] = useState(
    () => {
      const cartDataFromLocalStorage = getItemFromStorage(`cart${user?.sub}`);
      let hasSaddleFitReportValue = false;
      cartDataFromLocalStorage?.length > 0 &&
        cartDataFromLocalStorage?.forEach((item) => {
          if (item?.item?.saddleId === params?.id) {
            hasSaddleFitReportValue = item?.hasSaddleFitReport;
            setIsSaddleFitReportShown(true);
          }
        });
      return hasSaddleFitReportValue;
    }
  );
  const { data: listUserHorsesData } = useQuery(gql(listUserHorses));

  useEffect(() => {
    const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
      (item, i) => ({
        value: item?.id,
        label: item?.name,
      })
    );
    if (
      Array?.isArray(ByHorseFilterOption) &&
      ByHorseFilterOption?.length > 0
    ) {
      setSelectedHorse(ByHorseFilterOption[0]);
    }
  }, [listUserHorsesData]);

  const [saddleCheckout, {}] = useMutation(gql(SADDLE_CHECKOUT));

  const { loading, error, data } = useQuery(gql(GET_SADDLE_DETAIL), {
    variables: {
      saddleId: params?.id,
    },
  });
  const saddle = data?.saddle;
  const images = [saddleimg1, saddleimg2, saddleimg3, saddleimg4, saddleimg5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (klaviyo) {
      klaviyo.push(["track", "Viewed Product", saddle]);
    }
  }, []);

  const handleUpButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDownButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCartData = async () => {
    setIsSaddleFitReportShown(true);
    if (saddle) {
      const index = userCartData?.items?.findIndex(
        (elem) => elem?.saddleData?.id === params?.id
      );
      if (index !== -1) {
        changeActionState({ adding: false });
        toggleModal("isShoppingCartModalOpen");
        setTimeout(() => {
          closeModal("isShoppingCartModalOpen");
        }, 3000);
      } else {
        const { data } = await ADD_TO_CART({
          variables: { input: { saddleId: params?.id } },
          refetchQueries: ["listCartByUserId"],
        });

        if (klaviyo) {
          klaviyo.push([
            "track",
            "Added to Cart",
            data?.createCart?.saddleData,
          ]);
        }
        changeActionState({ adding: true });
        toggleModal("isShoppingCartModalOpen");
        setTimeout(() => {
          closeModal("isShoppingCartModalOpen");
        }, 3000);
      }
    }
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const onBuyNowHandler = async () => {
    if (saddle) {
      try {
        setIsLoading(true);
        const response = await saddleCheckout({
          variables: {
            input: {
              saddleIds: [params?.id],
            },
          },
        });
        const sessionURL = response.data.saddleCheckout.sessionURL;
        window.location.href = sessionURL;
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
        console.error("Mutation error:", error.message);
      }
    }
  };

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setIsSaddleFitReportChecked(true);
      setCartData((cartData) => {
        if (cartData?.length > 0) {
          const newCartData =
            cartData?.length > 0 &&
            cartData?.map((item) => {
              if (item?.item?.saddleId === state?.item?.saddleId) {
                item = {
                  ...item,
                  hasSaddleFitReport: true,
                  isAddedToCart: true,
                };
              }
              return item;
            });
          setItemInStorage(`cart${user?.sub}`, newCartData);
          return newCartData;
        } else {
          const newCartData = [
            {
              item: state?.item,
              hasSaddleFitReport: true,
              isAddedToCart: true,
            },
          ];
          setItemInStorage(`cart${user?.sub}`, newCartData);
          return newCartData;
        }
      });
    } else {
      setIsSaddleFitReportChecked(false);
      setCartData((cartData) => {
        if (cartData?.length > 0) {
          const newCartData =
            cartData?.length > 0 &&
            cartData?.map((item) => {
              if (item?.item?.saddleId === state?.item?.saddleId) {
                // item = { ...item?.item,saddle: {...item?.item?.saddle,price: item?.item?.saddle?.price>0? Number(item?.item?.saddle?.price)-100 : item?.item?.saddle?.price}, hasSaddleFitReport: false, isAddedToCart: false };
                item = {
                  ...item,
                  hasSaddleFitReport: false,
                  isAddedToCart: false,
                };
              }
              return item;
            });
          setItemInStorage(`cart${user?.sub}`, newCartData);
          return newCartData;
        } else {
          const newCartData = [
            {
              item: state?.item,
              hasSaddleFitReport: false,
              isAddedToCart: false,
            },
          ];
          setItemInStorage(`cart${user?.sub}`, newCartData);
          return newCartData;
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center  h-screen items-center w-full">
        <Loader
          filledColor="#2b364b"
          className="!h-[60px] !flex !items-center !text-center !justify-center"
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-full hidden lg:block h-auto py-32">
        <div className="back_to_homepage" onClick={() => navigate(-1)}>
          <div className="flex !w-[130px] items-center cursor-pointer hover:font-bold hover:text-[#5C80B6]">
            <RightArrowIcon />
            <p>Back to Saddles</p>
          </div>
        </div>
        <>
          <div className="w-[90%] 2xl:w-[1338px] flex justify-between mx-auto h-[700px]">
            <div className="w-full md:w-[50%] flex h-full">
              <div className="hidden lg:flex flex-col justify-center  items-center gap-y-[20px] h-full w-[20%]">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`saddleimg${index + 1}`}
                    className={`${
                      index === currentIndex
                        ? "selected border-[#5C80B6] w-[85px] h-[85px] border-2 rounded-[10px]"
                        : "border-[#999] border rounded-[10px]"
                    } hover:opacity-60  w-[85px] h-[85px]  transition-opacity duration-200`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
                <div className="flex gap-x-[20px] cursor-pointer">
                  <Button
                    onClick={handleUpButtonClick}
                    disabled={currentIndex === 0}
                    className={`${
                      currentIndex === 0 && "opacity-40 hover:!opacity-40"
                    }`}
                  >
                    <ArrowUpIcon
                      fill={currentIndex > 0 ? "#5C80B6" : "#999999"}
                    />
                  </Button>
                  <Button
                    onClick={handleDownButtonClick}
                    disabled={currentIndex === 4}
                    className={`${
                      currentIndex === 4 && "opacity-40 hover:!opacity-40"
                    }`}
                  >
                    <ArrowDownIcon
                      fill={currentIndex === 4 ? "#999999" : "#5C80B6"}
                    />
                  </Button>
                </div>
              </div>

              <div>
                <img
                  src={images[currentIndex]}
                  alt="saddle-imagess"
                  className="w-[540px] md:ml-[10px] xl:ml-[0px] h-[537px]"
                />
              </div>
            </div>

            <div className="clay-card-saddleDetails">
              {locationState?.index === 0 && (
                <h1 className="details_title_text">Just Arrived</h1>
              )}

              <div className="w-[85%] h-[85%]">
                <div className="saddle-details flex">
                  <h1 title={saddle.title} className="line-clamp-2">
                    {saddle.title}
                  </h1>
                </div>

                <div className="items-center justify-center">
                  <Gauge
                    score={saddle.score}
                    horseName={selectedHorse?.label}
                  />
                </div>

                <div className="saddle_codesection ">
                  <div className="saddle_price">
                    <div className="md:-mb-5 min-h-3"></div>
                    <p className="text-[#343434] text-[28px] font-bold">
                      $
                      {saddle?.price
                        ?.toFixed(2)
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                    <select className="saddle_size">
                      <option>Size {saddle?.size}</option>
                    </select>
                  </div>

                  <div className="saddle_report">
                    <div className="flex  mt-[50px]">
                      <Button
                        onClick={() => handleCartData()}
                        className="addToCart_btn"
                        primary
                        whiteOutline
                        disabled={addToCartLoading}
                        loading={addToCartLoading}
                      >
                        Add to cart
                      </Button>
                      <Button
                        className="buynow_btn ml-[38px]"
                        primary
                        whiteOutline
                        onClick={onBuyNowHandler}
                      >
                        {isLoading ? (
                          <Loader
                            filledColor="#2b364b"
                            className="!h-[30px] !animate-spin !flex !items-center !mt-[-6px] !text-center !justify-center"
                          />
                        ) : (
                          "Buy now"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

        <div className="vectorline">
          <VectorlineIcon />
        </div>
        <div className="w-[90%]  2xl:w-[1338px] mx-auto mt-[52px]">
          <p className="saddle_information">Saddle Information</p>
          <p className="saddle_para"> {saddle?.description}</p>
        </div>
      </div>

      <div className=" py-32 lg:hidden ">
        <div className="back_to_homepage_mobile" onClick={() => navigate(-1)}>
          <div className="flex items-center">
            <RightArrowIcon />
            <p>Back to Saddles</p>
          </div>
          {locationState?.index === 0 && (
            <h1 className="details_title_text_mobile lg:hidden">
              Just Arrived
            </h1>
          )}
        </div>

        <h1 className="saddle-details_mobile">{saddle?.title}</h1>

        <div className="w-[320px] h-auto mx-auto mt-[12px]">
          <div>
            <img
              src={images[currentIndex]}
              alt="saddle-image"
              className="w-[340px] h-[337px]"
            />
          </div>
          <div className="flex justify-center items-center w-full mt-[12px] gap-x-2">
            {images.map((image, index) => (
              <div
                key={index}
                src={image}
                alt={`saddleimg${index + 1}`}
                className={`${
                  index === currentIndex
                    ? "selected bg-[#5C80B6] border-[#5C80B6] border rounded-[10px]"
                    : "border-[#999999] bg-white border rounded-full"
                } hover:opacity-60 w-[12px] h-[12px] transition-opacity duration-200`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full sm:w-[80%] md:w-[65%] mx-auto">
          <div className="items-center w-[90%] mx-auto gap-x-2 mt-[30px]">
            <Gauge score={saddle?.score} horseName={selectedHorse?.label} />
          </div>
          <div className="saddle_price  mx-auto w-[90%]">
            <p className="text-[#343434] text-[28px] font-bold">
              ${saddle?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </p>
          </div>
          <div className="w-[90%]  mx-auto">
            <div className="saddle_report_mobile">
              <div className="flex w-full flex-col sm:flex-row mt-[20px]">
                <Button
                  onClick={() => handleCartData()}
                  className="addToCart_btn_mobile"
                  primary
                  whiteOutline
                >
                  Add to cart
                </Button>
                <Button
                  className="buynow_btn_mobile mt-[19px] sm:mt-0"
                  primary
                  whiteOutline
                  onClick={onBuyNowHandler}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="vectorline_mobile">
          <VectorlineIcon />
        </div>
        <div className="w-[90%] mx-auto mt-[24px]">
          <p className="saddle_information">Saddle Information</p>
          <p className="saddle_para_mobile"> {saddle?.description}</p>
        </div>
      </div>
      {actionState?.adding !== undefined && (
        <ShoppingCartModal
          isAdding={actionState.adding}
          description={
            actionState.adding
              ? "The Saddle is now added to your shopping cart."
              : "The Saddle is already in your shopping cart."
          }
        />
      )}
    </>
  );
};
