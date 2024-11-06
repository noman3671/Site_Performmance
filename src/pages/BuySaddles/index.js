import React, { useEffect, useLayoutEffect, useState } from "react";
import stars_image from "assets/icons/star_img.svg";
import maskgroup5 from "../../assets/icons/Mask5.svg";
import vector from "../../assets/icons/saddle-vector.svg";
import heart from "../../assets/icons/heart.svg";
import heartwhite from "../../assets/icons/heartwhite.svg";
import { FormInput } from "components/Inputs";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "context/CartContext";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Loader } from "@aws-amplify/ui-react";
import { GET_HORSE_SADDLE_FIT } from "apollo/queries/saddles";
import {
  CREATE_SADDLE_FAVOURITE,
  DELETE_SADDLE_FAVOURITE,
} from "apollo/mutations/saddleFavorite";
import {
  LIST_SADDLE_FAVORITES,
  LIST_SADDLE_FAVOURITES_BY_USER,
} from "apollo/queries/saddleFavorite";
import Button from "components/Buttons";
import { listUserHorses } from "apollo/queries/horses";
import "./style.css";
import { removeItemFromStorage } from "utils/localStorage";
import { SaddleSaleIcon } from "components/Icons";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import {
  formatListArray,
  getByDisciplineFilterValues,
  getValuesFunc,
} from "utils";
import { useSaddleContext } from "context/SaddleContext";
import { useLoggedIn } from "context/LoggedInContext";
import GaugeComponent from "react-gauge-component";
import { SADDLE_CHECKOUT } from "apollo/mutations/saddle";
import { createToast } from "utils/Toast";
import { useModalContext } from "../../context/ModalContext";
import ComingSoonModal from "../../components/Modal/ComingSoon/ComingSoonModal";

export const BuySaddles = () => {
  const Toast = createToast();
  const { user } = useLoggedIn();
  const { setCartData } = useCartContext();
  const { setters } = useSaddleContext();
  const [
    getHorseSaddleFit,
    { loading: loadingCardsData, error, data, fetchMore },
  ] = useLazyQuery(gql(GET_HORSE_SADDLE_FIT));
  const [loadingStates, setLoadingStates] = useState({});
  const location = useLocation();
  const { toggleModal, closeModal } = useModalContext();

  useEffect(() => {
    toggleModal("isComingSoonModalOpen");
  }, [location?.pathname]);

  useEffect(() => {
    if (location?.search) {
      removeItemFromStorage(`cart${user?.sub}`);
      setCartData([]);
    }
  }, [location?.search]);

  const [selectedRidingStyles, setSelectedRidingStyles] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(
    Array(data?.listHorseSaddleFit?.items.length).fill(false)
  );
  const [saddleCheckout, {}] = useMutation(gql(SADDLE_CHECKOUT));

  const navigate = useNavigate();
  const [selectedHorse, setSelectedHorse] = useState(null);

  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const [selectedArrival, setSelectedArrival] = useState(null);

  const arrivalsOptions = [
    {
      options: [
        { value: "NEW", label: "New" },
        { value: "USED", label: "Used" },
      ],
    },
  ];

  const [
    getListSaddleFavorites,
    { data: favouriteSaddleData, loading: loadingFavouriteSaddle },
  ] = useLazyQuery(gql(LIST_SADDLE_FAVORITES));

  const { data: listUserHorsesData, refetch: refetchListUserHorses } = useQuery(
    gql(listUserHorses)
  );

  const { data: listDisciplinesData, refetch: refetchListDisciplines } =
    useQuery(gql(LIST_DISCIPLINES));

  const [createSaddleFavourite] = useMutation(gql(CREATE_SADDLE_FAVOURITE), {
    refetchQueries: [
      {
        query: gql(LIST_SADDLE_FAVORITES),
        variables: { horseId: selectedHorse?.value },
      },
      { query: gql(LIST_SADDLE_FAVOURITES_BY_USER) },
    ],
  });

  const [deleteSaddleFavourite] = useMutation(gql(DELETE_SADDLE_FAVOURITE), {
    refetchQueries: [
      {
        query: gql(LIST_SADDLE_FAVORITES),
        variables: { horseId: selectedHorse?.value },
      },
      { query: gql(LIST_SADDLE_FAVOURITES_BY_USER) },
    ],
  });

  const favouriteSaddleList =
    favouriteSaddleData?.listHorseSaddleFitFavorites?.items?.map(
      (item) => item.saddleId
    );
  const toggleBtn = async (item, i) => {
    const updatedLoadingFavorites = [...loadingFavorites];
    updatedLoadingFavorites[i] = true;
    setLoadingFavorites(updatedLoadingFavorites);

    try {
      if (favouriteSaddleList?.includes(item?.saddleId)) {
        await deleteSaddleFavourite({
          variables: {
            saddleId: item?.saddleId,
            horseId: selectedHorse?.value,
          },
        });
      } else {
        await createSaddleFavourite({
          variables: {
            saddleId: item?.saddleId,
            horseId: selectedHorse?.value,
          },
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      updatedLoadingFavorites[i] = false;
      setLoadingFavorites(updatedLoadingFavorites);
    }
  };
  const handleDetails = (item, i) => {
    navigate(`/saddle/${item?.saddle?.id}`, {
      state: { item, index: i, selectedHorse },
    });
  };

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

  useEffect(() => {
    const fetchListUserHorsesData = async () => {
      await refetchListUserHorses();
    };

    fetchListUserHorsesData();
  }, []);

  useEffect(() => {
    if (selectedHorse && selectedHorse?.value !== "") {
      const selectedHorseData = listUserHorsesData?.listUserHorses?.items?.find(
        (item) => item?.id === selectedHorse?.value
      );
      const disciplinesOptions = formatListArray(
        listDisciplinesData?.listDisciplines
      );
      const result = getByDisciplineFilterValues(
        selectedHorseData?.discipline,
        listDisciplinesData?.listDisciplines
      );
      if (result) {
        setSelectedDiscipline(result);
      }
    }
  }, [selectedHorse, listUserHorsesData, listDisciplinesData?.listDisciplines]);

  useEffect(() => {
    const fetchData = async () => {
      const disciplineValues = getValuesFunc(selectedDiscipline);
      if (selectedHorse?.value) {
        await getHorseSaddleFit({
          variables: {
            limit: 20,
            nextToken: null,
            filter: {
              discipline: disciplineValues,
              newOrUsed: selectedArrival?.value,
            },
            horseId: selectedHorse?.value,
          },
          fetchPolicy: "network-only",
        });

        await getListSaddleFavorites({
          variables: {
            horseId: selectedHorse?.value,
          },
        });
      }
    };
    fetchData();
  }, [selectedHorse, selectedArrival, selectedDiscipline]);

  const loadMoreBtnHandler = () => {
    fetchMore({
      variables: {
        limit: 20,
        horseId: selectedHorse?.value,
        nextToken: data?.listHorseSaddleFit?.nextToken,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listHorseSaddleFit: {
            ...fetchMoreResult.listHorseSaddleFit,
            items: [
              ...prev.listHorseSaddleFit.items,
              ...fetchMoreResult.listHorseSaddleFit.items,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    const refetchData = async () => {
      try {
        await refetchListDisciplines();
      } catch (error) {}
    };
    refetchData();
  }, []);

  const byHorseFilterHandler = (selectedValue) => {
    setSelectedHorse(selectedValue);
  };

  const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
    (item, i) => ({
      value: item?.id,
      label: item?.name,
    })
  );

  const byArrivalFilterHandler = (selectedValue) => {
    setSelectedArrival(selectedValue);
  };

  const byDisciplineFilterHandler = (selectedValue) => {
    setSelectedDiscipline(selectedValue);
  };

  const disciplinesOptions = formatListArray(
    listDisciplinesData?.listDisciplines
  );

  const westernOptions = disciplinesOptions.filter(
    (option) => option.label === "WESTERN"
  );

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

  return (
    <>
      {/* <ComingSoonModal /> */}
      <div className="my-[120px]">
        <div className="w-[90%] max-w-[1300px] flex flex-wrap h-auto justify-between mx-auto">
          <div className="w-full  lg:w-[432px] h-auto">
            <img src={stars_image} alt="stars" />
            <h1 className="table-saddle__title">
              Find Your Best Fitting Saddle
            </h1>
            <p className="saddle-icon_text">
              {" "}
              SaddleFit uses advanced 3D technology to find the best fitting
              saddle based on your horse’s unique shape for a perfect fit,
              enhancing comfort and performance.
            </p>
          </div>
          <div className="h-full w-full lg:w-auto mt-10 md:mt-20">
            <div className="flex flex-wrap gap-[48px] relative">
              <FormInput
                className="saddle-profile-form__field"
                label="Filter by Horse"
                type="select2"
                height="56px"
                placeholder="Select horse"
                selectedValues={selectedHorse}
                options={ByHorseFilterOption && ByHorseFilterOption}
                onChange={byHorseFilterHandler}
              />
              {/* {/* 
            {/* <FormInput
              className="saddle-profile-form__field"
              label="Filter by Condition"
              type="select2"
              height="56px"
              placeholder={"select new or used"}
              selectedValues={selectedArrival}
              options={arrivalsOptions}
              onChange={byArrivalFilterHandler}
            /> */}

              <FormInput
                className="saddle-profile-form__field"
                label="Filter by Discipline"
                isDisabled={selectedHorse?.value ? false : true}
                isMulti={true}
                height="56px"
                type="select2"
                closeMenuOnSelect={false}
                placeholder={"select discipline"}
                options={[]}
                onChange={byDisciplineFilterHandler}
              />

              <FormInput
                className="saddle-profile-form__field"
                label="Filter by Brand"
                isDisabled={selectedHorse?.value ? false : true}
                isMulti={true}
                height="56px"
                type="select2"
                closeMenuOnSelect={false}
                placeholder={"Select Brand"}
                selectedValues={selectedDiscipline}
                // selectedValues={[]}
                options={westernOptions}
                // this option needs to be the brands of the saddles
                onChange={byDisciplineFilterHandler}
              />
            </div>
            <div className=" lg:flex justify-between mt-5">
              <div className="w-[300px] flex flex-wrap gap-[20px]  mr-[40px] mb-5 h-full">
                {Array.isArray(selectedDiscipline) &&
                selectedDiscipline?.length > 0 &&
                selectedDiscipline?.map((style, index) => (
                <div key={index} className="p-[10px] riding-style-pill">
                  {style.label}
                </div>
                ))}
              </div>
              <div className="flex items-start w-full max-w-[400px] sm:w-[80%] sm:max-w-[650px]">
                <div className="flex items-center w-full justify-between">
                  <SaddleSaleIcon />
                  <p className="saddle-icon_text w-[90%]">
                    Saddle with this icon are the top fitting saddles for your
                    horse!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loadingCardsData ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader
            filledColor="#2b364b"
            className="!h-[60px] !flex !items-center !text-center !justify-center"
          />
        </div>
      ) : (
        <div className="w-[90%] max-w-[1300px] mx-auto  gap-x-10 flex flex-wrap  justify-start">
          {data?.listHorseSaddleFit?.items.length > 0 ? (
            data?.listHorseSaddleFit?.items
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      i <= 2
                        ? "clay-card-saddle_profile"
                        : "clay-card-saddle_profile_image"
                    } `}
                  >
                    {i === 0 && (
                      <h1 className="profile_title_text">Just Arrived</h1>
                    )}

                    <div className="w-[90%] saddle-text  mb-6 h-[80%]">
                      <div className="flex gap-2 items-center  justify-between  h-[85%]">
                        <div className="flex items-start justify-start">
                          <div className="relative  flex  justify-start  items-start w-full max-w-[350px] md:mt-6 h-full max-h-[200px]">
                            <img
                              src={maskgroup5}
                              alt="maskgroup"
                              className="w-full max-w-[350px] mt-[-60px] md:mt-0 h-full max-h-[280px]"
                            />
                            {item?.score > 70 && (
                              <img
                                src={vector}
                                alt="maskgroup"
                                className="w-[28px] h-[28px] absolute top-0 left-0"
                              />
                            )}
                          </div>
                        </div>

                        <div className="w-[50%]  md:w-[380px] flex flex-col md:h-[100%]">
                          <div className="md:flex">
                            <div className="w-auto md:w-[350px]  h-[120px] md:h-[160px]  flex  flex-col md:justify-evenly">
                              <p
                                title={item?.saddle?.title}
                                onClick={() => {
                                  setters.setLocationPathName(
                                    location.pathname
                                  );
                                  handleDetails(item, i);
                                }}
                                className="h-[80px] line-clamp-3 w-full items-center mt-2   font-bold cursor-pointer flex flex-wrap text-[#343434] hover:text-[#5C80B6]  text-[17px]"
                              >
                                {item?.saddle?.title}
                              </p>

                              <p className="  text-[#343434] font-bold text-[14px]">
                                ${item?.saddle?.price}
                              </p>
                            </div>
                            <div className="flex h-[120px] md:h-[160px]  w-[150px] sm:w-[200px] flex-col-reverse justify-start items-center">
                              <GaugeComponent
                                className="table-saddle__title w-[200px] md:w-[300px]"
                                type="semicircle"
                                arc={{
                                  colorArray: [
                                    "#EF4444",
                                    "#EF4444",
                                    "#FBBF24",
                                    "#FBBF24",
                                    "#22C55E",
                                    "#22C55E",
                                    "#22C55E",
                                  ],
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
                          <div className="saddle_btn_container">
                            <div className="flex items-center gap-8">
                              <a
                                className={`saddle_btn cursor-pointer`}
                                onClick={() => {
                                  setters.setLocationPathName(
                                    location.pathname
                                  );
                                  handleDetails(item, i);
                                }}
                              >
                                More Details
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
                              onClick={() => toggleBtn(item, i)}
                              className={` saddle_btn_heart cursor-pointer ${
                                loadingFavorites[i] ? "loading" : ""
                              } ${
                                favouriteSaddleList?.includes(item?.saddleId) &&
                                "!bg-[#2B364B]"
                              }`}
                            >
                              {loadingFavorites[i] ? (
                                <Loader
                                  filledColor="#2b364b"
                                  className="!h-[30px] !flex !items-center !text-center !justify-center"
                                />
                              ) : favouriteSaddleList?.includes(
                                  item?.saddleId
                                ) ? (
                                <img
                                  src={heartwhite}
                                  alt="heart"
                                  className="w-[24px] h-[24px]"
                                />
                              ) : (
                                <img
                                  src={heart}
                                  alt="heart"
                                  className="w-[24px] h-[24px]"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="saddle_btn_container_mobile mt-2">
                        <a
                          className={`saddle_btn`}
                          onClick={() => {
                            setters.setLocationPathName(location.pathname);
                            handleDetails(item, i);
                          }}
                        >
                          More Details
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
                        <div
                          onClick={() => toggleBtn(item, i)}
                          className={`saddle_btn_heart cursor-pointer ${
                            loadingFavorites[i] ? "loading" : ""
                          } ${
                            favouriteSaddleList?.includes(item?.saddleId) &&
                            "!bg-[#2B364B]"
                          }`}
                        >
                          {loadingFavorites[i] ? (
                            <Loader
                              filledColor="#2b364b"
                              className="!h-[30px] !flex !items-center !text-center !justify-center"
                            />
                          ) : favouriteSaddleList?.includes(item?.saddleId) ? (
                            <img
                              src={heartwhite}
                              alt="heart"
                              className="w-[24px] h-[24px]"
                            />
                          ) : (
                            <img
                              src={heart}
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
            <p
              className="saddle-icon_text w-full"
              style={{ textAlign: "center", margin: 50 }}
            >
              Unfortunately, we do not have a saddle available for this horse.
              Please check back later.
            </p>
          )}
        </div>
      )}

      {data?.listHorseSaddleFit?.nextToken && (
        <div className="flex justify-center mx-auto">
          <Button
            className="load_more_btn mt-[20px]"
            primary
            whiteOutline
            loading={loadingCardsData}
            onClick={loadMoreBtnHandler}
          >
            load more
          </Button>
        </div>
      )} 
      </div>
    </>
  );
};
