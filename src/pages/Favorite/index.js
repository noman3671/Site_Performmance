import React, { useEffect } from "react";
import stars_image from "assets/icons/star_img.svg";
import saddle1 from "assets/images/saddle1.png";
import saddle2 from "assets/images/saddle2.png";
import saddle3 from "assets/images/saddle3.png";
import vector from "assets/icons/saddle-vector.svg";
import heartwhite from "assets/icons/heartwhite.svg";
import { FormInput } from "components/Inputs";
import { useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "context/CartContext";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Loader } from "@aws-amplify/ui-react";
import Button from "components/Buttons";
import { SaddleSaleIcon } from "components/Icons";

import {
  LIST_SADDLE_FAVORITES,
  LIST_SADDLE_FAVOURITES_BY_USER,
} from "apollo/queries/saddleFavorite";
import { DELETE_SADDLE_FAVOURITE } from "apollo/mutations/saddleFavorite";
import { listUserHorses } from "apollo/queries/horses";
import { SADDLE_CHECKOUT } from "apollo/mutations/saddle";
import { getCurrentUser } from "aws-amplify/auth";
import { useSaddleContext } from "context/SaddleContext";
import GaugeComponent from "react-gauge-component";
import { createToast } from "utils/Toast";

const Favorite = () => {
  const { setters } = useSaddleContext();
  const Toast = createToast();

  const [selectedHorse, setSelectedHorse] = useState(null);
  const [loadingToggle, setLoadingToggle] = useState({});
  const [getSaddleFavorites, { loading, data }] = useLazyQuery(
    gql(LIST_SADDLE_FAVORITES)
  );
  const [saddleCheckout, {}] = useMutation(gql(SADDLE_CHECKOUT));
  const [loadingStates, setLoadingStates] = useState({});

  const { setCartData } = useCartContext();
  const navigate = useNavigate();

  const { loading: listLoading, data: listUserHorsesData, refetch: refetchListUserHorses } = useQuery(
    gql(listUserHorses)
  );

  const [deleteSaddleFavourite, {}] = useMutation(gql(DELETE_SADDLE_FAVOURITE));

  useEffect(() => {
    const fetchListUserHorsesData = async () => {
      try {
        const { username } = await getCurrentUser();
        if (username) {
          await refetchListUserHorses();
        }
      } catch (error) {
        console.error("Error fetching user horses:", error);
      }
    };

    fetchListUserHorsesData();
  }, []);

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

  const handleCartData = (item, i) => {
    setCartData((cartData) => {
      const newCartData = [...cartData, item];
      return newCartData;
    });
  };

  useEffect(() => {
    if (selectedHorse && selectedHorse?.value) {
      getSaddleFavorites({
        variables: { horseId: selectedHorse?.value },
        fetchPolicy: "network-only",
      });
    }
  }, [selectedHorse]);

  const horseRidingOptions = [
    {
      options: [
        { value: "cutting", label: "cutting" },
        { value: "Barrel Racing", label: "Barrel Racing" },
        { value: "Reigning", label: "Reigning" },
        { value: "Roper", label: "Roper" },
      ],
    },
  ];

  const onBuyNowHandler = async (saddleId) => {
    if (saddleId) {
      try {
        setLoadingStates((prevState) => ({
          ...prevState,
          [saddleId]: true,
        }));

        const response = await saddleCheckout({
          variables: {
            input: {
              saddleIds: [saddleId],
            },
          },
        });

        const sessionURL = response.data.saddleCheckout.sessionURL;
        window.location.href = sessionURL;

        setLoadingStates((prevState) => ({
          ...prevState,
          [saddleId]: false,
        }));
      } catch (error) {
        setLoadingStates((prevState) => ({
          ...prevState,
          [saddleId]: false,
        }));
        Toast.fire({
          icon: "error",
          title: error.message?.toString() || "Undefined error",
        });
      }
    }
  };

  const datas = [
    {
      id: 0,
      arrived: "Just Arrived",
      image: saddle1,
      mainHeading: 'New! 15.5" Cactus Saddlery Will James Ranch Saddle',
      code: "SCA155WJ14FL",
      number: 50,
      price: "$4,299.00",
    },
    {
      id: 1,
      arrived: "Just Arrived",
      image: saddle2,
      mainHeading: 'New! 14" Martin Saddlery Stingray Barrel Racing Saddle',
      code: "247114007009633",
      number: 98,
      price: "$5,099.00",
    },
    {
      id: 2,
      arrived: "Just Arrived",
      image: saddle3,
      mainHeading: 'New! 15.5" Martin Ranch Saddle',
      code: "236415506508989",
      number: 98,
      price: "$5,299.00",
    },
  ];

  const toggle = async (id) => {
    if (id) {
      setLoadingToggle((prevState) => ({
        ...prevState,
        [id]: true,
      }));
      try {
        await deleteSaddleFavourite({
          variables: { saddleId: id, horseId: selectedHorse?.value },
          refetchQueries: [
            {
              query: gql(LIST_SADDLE_FAVORITES),
              variables: { horseId: selectedHorse?.value || "" },
            },
            {
              query: gql(LIST_SADDLE_FAVOURITES_BY_USER),
            },
          ],
        });
        setLoadingToggle((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    }
  };

  const byHorseFilterHandler = (selectedValue) => {
    setSelectedHorse(selectedValue);
  };

  const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
    (item, i) => ({
      value: item?.id,
      label: item?.name,
    })
  );

  const handleDetails = (item, i) => {
    console.log({ item });
    navigate(`/saddle/${item?.saddle?.id}`, {
      state: { item, index: i, selectedHorse },
    });
  };

  return (
    <div className="my-[120px]">
      <div className="w-[310px]  sm:w-[40%]  lg:w-[90%] 2xl:w-[1338px]  mx-auto flex flex-wrap gap-[40px]  items-center  justify-between ">
        <div className="w-[383px]  md:w-[583px]   h-auto ">
          <img src={stars_image} alt="stars" />
          <h1 className="favorite-saddle__title">Your favorite Saddles</h1>
          <p className="favorite-text">
            You’re getting closer to finding the Best Fit!
          </p>
          <p className="favorite-text_mobile">Find the Best Fit!</p>
        </div>
        <div className="h-auto w-full md:w-auto flex gap-[48px]">
          <FormInput
            className="favorite-form__field capitalize"
            label="Filter by horse:"
            type="select2"
            height="56px"
            placeholder="Select horse"
            selectedValues={selectedHorse}
            options={ByHorseFilterOption && ByHorseFilterOption}
            onChange={byHorseFilterHandler}
          />
        </div>
      </div>
      {loading || listLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader
            filledColor="#2b364b"
            className="!h-[60px] !flex !items-center !text-center !justify-center"
          />
        </div>
      ) : (
        <div className="w-[310px]  sm:w-[40%] md:w-[60%] lg:w-[90%] 2xl:w-[1338px]  mx-auto flex flex-wrap justify-center lg:justify-start gap-x-[20px]  items-center">
          {data?.listHorseSaddleFitFavorites?.items?.length > 0 ? (
            data?.listHorseSaddleFitFavorites?.items
              ?.slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      i <= 2 ? "clay-card-favorite" : "clay-card-favoriteimage"
                    } `}
                  >
                    <div className=" w-[90%] saddle-text  mb-6 h-[80%]">
                      <div className="flex items-center  justify-between h-[85%]">
                        <div className="relative w-[200px]  sm:!w-[350px] h-[75%]">
                          <img
                            src={item?.image || saddle1}
                            alt="maskgroup"
                            className="w-[160px] h-[115px]  md:w-[173px]  md:h-[172px]"
                          />
                          {item?.score > 70 && (
                            <img
                              src={vector}
                              alt="maskgroup"
                              className="w-[28px] h-[28px] absolute top-0 left-0"
                            />
                          )}
                        </div>

                        <div className="w-[200px] md:w-auto  md:flex items-center">
                          <div className="w-auto md:w-[150px] h-[120px] pt-10 md:pt-0  flex flex-col justify-between">
                            <p className="h-[80px] line-clamp-3 w-full md:!w-[200px] font-bold  cursor-pointer text-[#343434] hover:text-[#5C80B6]   text-[18px]">
                              {item?.saddle?.title}
                            </p>

                            <p className="mt-[3px]  text-[#343434] font-bold text-[14px]">
                              ${item?.saddle?.price}
                            </p>
                          </div>
                          <div className="flex h-[120px] md:h-[160px] mr-10 md:mr-0 w-[150px] sm:w-[250px]  justify-start items-center">
                            <GaugeComponent
                              className="table-saddle__title w-[200px] md:w-[300px]"
                              type="semicircle"
                              arc={{
                                colorArray: ["#FF2121", "#00FF15"],
                                padding: 0.02,
                                subArcs: [
                                  { limit: 40 },
                                  { limit: 60 },
                                  { limit: 70 },
                                  {},
                                  {},
                                  {},
                                  {},
                                ],
                              }}
                              pointer={{ type: "blob", animationDelay: 0 }}
                              value={item?.score}
                              labels={{
                                valueLabel: {
                                  style: {
                                    fill: "#2B364B",
                                  },
                                },
                                tickLabels: {
                                  hideMinMax: true,
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end items-center">
                        <div className="saddle_btn_fav">
                          <div className="flex items-center gap-8">
                            <a
                              className={`saddle_btn cursor-pointer`}
                              onClick={() => {
                                setters.setLocationPathName(location.pathname);
                                handleDetails(item, i);
                              }}
                            >
                              More Detail
                            </a>
                            <Button
                              className="buynow_btn mt-3"
                              primary
                              disabled={loadingStates[item?.saddleId]}
                              loading={loadingStates[item?.saddleId]}
                              onClick={() => onBuyNowHandler(item?.saddleId)}
                            >
                              Buy Now
                            </Button>
                          </div>

                          <div></div>
                          <div
                            onClick={() => toggle(item?.saddleId)}
                            className={`saddle_btn_heart cursor-pointer !bg-[#2B364B]`}
                          >
                            {loadingToggle && loadingToggle[item?.saddleId] ? (
                              <Loader
                                filledColor="#2b364b"
                                className="!h-[30px] !flex !items-center !text-center !justify-center"
                              />
                            ) : (
                              <img
                                src={heartwhite}
                                alt="heart"
                                className="w-[24px] h-[24px]"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="saddle_btn_container_mobile">
                      <div className="flex items-start gap-4">
                        <a
                          className={`saddle_btn cursor-pointer`}
                          onClick={() => {
                            setters.setLocationPathName(location.pathname);
                            handleDetails(item, i);
                          }}
                        >
                          More Detail
                        </a>
                        <Button
                          className="buynow_btn mt-3"
                          primary
                          disabled={loadingStates[item?.saddleId]}
                          loading={loadingStates[item?.saddleId]}
                          onClick={() => onBuyNowHandler(item?.saddleId)}
                        >
                          Buy Now
                        </Button>
                      </div>
                        <div
                          onClick={() => toggle(item?.saddleId)}
                          className={`saddle_btn_heart cursor-pointer !bg-[#2B364B]`}
                        >
                          {loadingToggle && loadingToggle[item?.saddleId] ? (
                            <Loader
                              filledColor="#2b364b"
                              className="!h-[30px] !flex !items-center !text-center !justify-center"
                            />
                          ) : (
                            <img
                              src={heartwhite}
                              alt="heart"
                              className="w-[24px] h-[24px]"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="no_favorite_card capitalize w-full">No Favorite Cart</div>
          )}
        </div>
      )}

      <div className="lg:flex hidden  w-[310px]  sm:w-[40%]  lg:w-[90%] 2xl:w-[1338px] justify-center items-center relative top-[-20px] gap-[25px] mt-10 mx-auto">
        <SaddleSaleIcon  />
        <p className="saddle-icon_text">
          Saddle with this icon are the top fitting saddles for your horse!
        </p>
      </div>
    </div>
  );
};

export default Favorite;
