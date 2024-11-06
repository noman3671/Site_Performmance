import "./style.css";
import React, { useEffect, useState } from "react";
import { FormInput } from "components/Inputs";
import CactusNotifyIcon from "assets/icons/cactus_notify_icon.svg?react";
import CactusSaddleIcon from "assets/icons/cactus_saddleIcon.svg?react";
import CarouselCards from "components/CarouselCards";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { GET_HORSE_SADDLE_FIT } from "apollo/queries/saddles";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { listUserHorses } from "apollo/queries/horses";
import { formatListArray } from "utils";
import { useLoggedIn } from "context/LoggedInContext";
import { Loader } from "@aws-amplify/ui-react";
import RangeSlider from "components/RangeSlider";
import { FormProvider, useForm } from "react-hook-form";

const SaddleSelectionControls = () => {
  const minPriceLimit = 250;
  const maxPriceLimit = 6999000;

  const methods = useForm({
    defaultValues: {
      minPrice: minPriceLimit.toLocaleString("en-US"),
      maxPrice: maxPriceLimit.toLocaleString("en-US"),
    },
  });

  const { setValue, watch } = methods;

  const minPrice =
    parseInt(watch("minPrice")?.replace(/,/g, ""), 10) || minPriceLimit;
  const maxPrice =
    parseInt(watch("maxPrice")?.replace(/,/g, ""), 10) || maxPriceLimit;

  const formatWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMinPriceChange = (e) => {
    let value = e.target.value.replace(/,/g, "");
    if (value.length <= 7) {
      value = parseInt(value, 10);
  
      if (!isNaN(value) && value >= minPriceLimit && value <= maxPrice) {
        setValue("minPrice", formatWithCommas(value));
      } else if (value > maxPrice) {
        setValue("minPrice", formatWithCommas(maxPrice));
      } else if (isNaN(value) || value < minPriceLimit) {
        setValue("minPrice", minPriceLimit.toLocaleString("en-US"));
      }
    }
  };
  
  const handleMaxPriceChange = (e) => {
    let value = e.target.value.replace(/,/g, "");
    if (value.length <= 7) {
      value = parseInt(value, 10);
  
      if (!isNaN(value) && value >= minPriceLimit && value <= maxPriceLimit) {
        setValue("maxPrice", formatWithCommas(value));
      } else if (!isNaN(value) && value > maxPriceLimit) {
        setValue("maxPrice", maxPriceLimit.toLocaleString("en-US"));
      } else if (isNaN(value) || value < minPriceLimit) {
        setValue("maxPrice", maxPriceLimit.toLocaleString("en-US"));
      }
    }
  };

  const { user } = useLoggedIn();
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const { data: listUserHorsesData, refetch: refetchListUserHorses } = useQuery(
    gql(listUserHorses),
    { skip: !user }
  );

  const [getHorseSaddleFit, { data, loading }] = useLazyQuery(
    gql(GET_HORSE_SADDLE_FIT)
  );
  const { data: listDisciplinesData } = useQuery(gql(LIST_DISCIPLINES));

  const disciplinesOptions = formatListArray(
    listDisciplinesData?.listDisciplines
  );

  const westernOptions = disciplinesOptions.filter(
    (option) => option.label === "WESTERN"
  );

  const byDisciplineFilterHandler = (selectedValue) => {
    setSelectedDiscipline(selectedValue);
  };

  const bySortFilterHandler = (selectedValue) => {
    setSelectedSort(selectedValue);
  };

  useEffect(() => {
    if (user) {
      const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
        (item) => ({
          value: item?.id,
          label: item?.name,
        })
      );
      if (
        Array.isArray(ByHorseFilterOption) &&
        ByHorseFilterOption.length > 0
      ) {
        setSelectedHorse(ByHorseFilterOption[0]);
      }
    }
  }, [listUserHorsesData, user]);

  useEffect(() => {
    if (user) {
      const fetchListUserHorsesData = async () => {
        await refetchListUserHorses();
      };
      fetchListUserHorsesData();
    }
  }, [user, refetchListUserHorses]);

  const getSortOptions = (selectedArrival) => {
    switch (selectedArrival?.value) {
      case "PRICE_LOW":
        return { name: "price", order: "ASC" };
      case "PRICE_HIGH":
        return { name: "price", order: "DESC" };
      case "NEW_ARRIVALS":
        return { name: "createdAt", order: "DESC" };
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedHorse?.value && user) {
        await getHorseSaddleFit({
          variables: {
            limit: 20,
            filter: {
              brandName: "CACTUS SADDLERY",
              ...(selectedDiscipline && {
                discipline: [selectedDiscipline?.value],
              }),
            },
            nextToken: null,
            sort: getSortOptions(selectedSort),
            horseId: selectedHorse?.value,
          },
          fetchPolicy: "network-only",
        });
      }
    };
    fetchData();
  }, [selectedHorse, selectedDiscipline, selectedSort, user]);

  const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
    (item) => ({
      value: item?.id,
      label: item?.name,
    })
  );

  const byHorseFilterHandler = (selectedValue) => {
    setSelectedHorse(selectedValue);
  };

  const arrivalsOptions = [
    { value: "NEW_ARRIVALS", label: "New Arrivals" },
    { value: "PRICE_HIGH", label: "Price High" },
    { value: "PRICE_LOW", label: "Price low" },
  ];

  const listSaddles = data?.listHorseSaddleFit?.items;

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[40px] sm:mt-[61px] mb-[69px]">
        <div className="flex flex-col justify-center items-center gap-y-[34px]">
          <p className="cactus_main_heading">
            Select Your Horse to Get <span>Your SaddleFit Score</span>
          </p>
          <FormInput
            className="cactus_formInput"
            type="single-select"
            height="56px"
            placeholder="Select a horse"
            selectedValues={selectedHorse}
            options={ByHorseFilterOption}
            onChange={byHorseFilterHandler}
          />
        </div>
        <div className="gap-y-[34px] mt-[54px] flex flex-col justify-center items-center">
          <h4 className="best_selling_saddle">Our Best Selling Saddles</h4>
          <div className="flex flex-col md:flex-row gap-y-[34px] md:gap-x-[34px]">
            <div className="flex flex-col items-center justify-center gap-y-6 p-4 max-w-[357px] sm:max-w-[361px] border border-solid border-[#EAEBED] rounded-2xl">
              <h2 className="text-[#2B364B] text-base font-[Montserrat] font-bold leading-normal">
                Pricing
              </h2>
              <div className="flex flex-row items-center gap-x-4">
                <FormProvider {...methods}>
                  <FormInput
                    name="minPrice"
                    className="w-[156.5px] form_input_min_val !h-auto relative"
                    label="Min Price"
                    maxLength={9}
                    readOnly
                    // onChange={handleMinPriceChange}
                  />
                  <FormInput
                    name="maxPrice"
                    className="w-[156.5px] form_input_max_val !h-auto relative"
                    label="Max Price"
                    maxLength={9}
                    readOnly
                    // onChange={handleMaxPriceChange}
                  />
                </FormProvider>
              </div>
              <RangeSlider
                minPrice={parseInt(minPrice)}
                maxPrice={parseInt(maxPrice)}
                setMinPrice={(value) =>
                  setValue("minPrice", value.toLocaleString("en-US"))
                }
                setMaxPrice={(value) =>
                  setValue("maxPrice", value.toLocaleString("en-US"))
                }
              />
            </div>

            <div className="flex flex-col items-center gap-8 h-auto">
              <FormInput
                className="cactus_dropdown_formInput"
                isClearable
                type="select2"
                label="Sort"
                height="44px"
                placeholder="Best Saddlefit Score"
                options={arrivalsOptions}
                onChange={bySortFilterHandler}
              />
              <FormInput
                className="cactus_dropdown_formInput"
                isClearable
                type="select2"
                label="Type"
                height="44px"
                placeholder="Select Discipline"
                options={westernOptions}
                onChange={byDisciplineFilterHandler}
              />
              <FormInput
                className="cactus_dropdown_formInput"
                isClearable
                type="select2"
                label="Seat Size"
                height="44px"
                placeholder="Select Size"
                options={[]}
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="cactus_notify">
            <CactusNotifyIcon />
            <p className="saddle_note">
              <span className="pr-1">NOTE:</span> Saddles with this
            </p>
            <div className="flex gap-x-1">
              <span className="dots">“</span>
              <CactusSaddleIcon />
              <span className="dots">”</span>
            </div>
            <p className="cactus_notify_desc">
              icon are the top fitting saddles for your horse!
            </p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[100px] w-full">
          <Loader
            filledColor="#2b364b"
            className="!h-[50px] !flex !items-center !text-center !justify-center"
          />
        </div>
      ) : (
        <CarouselCards
          items={listSaddles}
          horses={ByHorseFilterOption}
          loading={loading}
        />
      )}
    </>
  );
};

export default SaddleSelectionControls;
