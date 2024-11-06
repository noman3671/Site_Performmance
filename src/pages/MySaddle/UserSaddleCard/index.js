import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import saddleImage from "assets/images/saddleImage.png";
import { EditIcon } from "components/Icons";
import { TrashIcon } from "components/Icons";
import { useNavigate } from "react-router-dom";
import Button from "components/Buttons";
import { useSaddleContext } from "context/SaddleContext";
import { FormInput } from "components/Inputs";
import { listUserHorses } from "apollo/queries/horses";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CALCULATE_SADDLE_FIT_SCORE,
  UN_SELL_SADDLE,
} from "apollo/mutations/saddle";
import "./style.css";

import SellSaddleFormModal from "components/Modal/SellSaddle/SellSaddleFormModal";
import { Loader } from "@aws-amplify/ui-react";
import ModalStore from "components/Modal/ModalStore";
import GaugeComponent from "react-gauge-component";
import { useModalContext } from "context/ModalContext";
const UserSaddleCard = ({
  item,
  index,
  selectAllSaddleIds,
  onHandleDelete,
}) => {
  const methods = useForm({
    defaultValues: {
      horseId: "",
    },
  });
  const { toggleModal } = useModalContext();
  const { state, setters } = useSaddleContext();
  const [unSellSaddle] = useMutation(gql(UN_SELL_SADDLE));

  const navigate = useNavigate();
  const { data: listUserHorsesData, refetch: refetchListUserHorses } = useQuery(
    gql(listUserHorses)
  );

  const [calculateSaddleFitScore] = useMutation(
    gql(CALCULATE_SADDLE_FIT_SCORE)
  );

  const [isChecked, setIsChecked] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState({
    value: "",
    label: "select",
  });

  const [score, setScore] = useState(null);
  const [calculatingFitScore, setCalculatingFitScore] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setters.setDeleteSaddle((prevDeleteSaddle) => [
        ...new Set([...prevDeleteSaddle, item?.id]),
      ]);
    } else {
      setters.setDeleteSaddle((prevDeleteSaddle) =>
        prevDeleteSaddle.filter((saddleId) => saddleId !== item?.id)
      );
    }
  };

  useEffect(() => {
    setIsChecked(state.selectAll);
    if (state.selectAll) {
      selectAllSaddleIds();
    } else {
      selectAllSaddleIds(true);
      setIsChecked(false);
    }
  }, [state.selectAll]);

  useEffect(() => {
    setIsChecked(false);
  }, [state.isDeletedSuccessfully]);

  const onHandleUnList = async (item) => {
    try {
      await unSellSaddle({
        variables: { saddleId: item?.id },
        refetchQueries: ["listMySaddles"],
      });

      navigate("/user/my-saddle");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchListUserHorsesData = async () => {
      await refetchListUserHorses();
    };
    fetchListUserHorsesData();
  }, []);

  const onSellSaddleHandler = async () => {
    toggleModal("isSellSaddleFormModalOpen");
    setters.setSaddleData(item);
  };

  const byHorseFilterHandler = async (selectedValue) => {
    try {
      setSelectedHorse(selectedValue);
      setCalculatingFitScore(true);
      const res = await calculateSaddleFitScore({
        variables: {
          horseId: selectedValue?.value,
          saddleId: item?.id,
        },
      });
      setScore(res?.data?.calculateFitScore?.score);
      setCalculatingFitScore(false);
    } catch (error) {
      ModalStore.openSimpleError({
        title: "ERROR",
        subtitle: error.message?.toString() || "Undefined error",
      });
    }
  };

  const ByHorseFilterOption = listUserHorsesData?.listUserHorses?.items.map(
    (item, i) => ({
      value: item?.id,
      label: item?.name,
    })
  );

  return (
    <>
      <div
        className={`clay-card-sell_saddle w-full sm:w-[650px] relative`}
        key={index}
      >
        <div className="flex justify-around w-[90%] gap-x-2 sm:gap-x-0 sm:w-[100%] items-start mx-auto my-auto">
          <img
            src={item?.photo ? item?.photo : saddleImage}
            alt="saddleImage"
            className="w-[130px] rounded-[10px] sm:w-[172px] h-[130px] sm:h-[172px]"
          />

          <div className="w-[190px]">
            <h1 className="saddle_sell_mainHeading" title={item?.title}>
              {item?.title}
            </h1>

            <FormProvider {...methods}>
              <FormInput
                className="sell_saddle-form__field"
                label="Horse"
                height="40px"
                type="select2"
                id="input-field"
                placeholder="Select horse"
                selectedValues={selectedHorse}
                options={ByHorseFilterOption && ByHorseFilterOption}
                onChange={byHorseFilterHandler}
              />
            </FormProvider>

            <div className="w-[150px]  sm:hidden flex">
              {calculatingFitScore ? (
                <div className="loader-container !w-[260px] h-full flex justify-center items-center">
                  <Loader
                    filledColor="#2b364b"
                    className="w-[30px] h-[30px]  rounded-full !flex !items-center !text-center !justify-center"
                  />
                </div>
              ) : (
                <GaugeComponent
                  className="table-saddle__title w-[150px] md:w-auto"
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
                  value={score && score}
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
              )}
            </div>

            <div className="flex  gap-x-2 sm:gap-5 sm:mt-10">
              <Button
                onClick={() => {
                  navigate("/user/my-saddle/edit", { state: { item } });
                }}
                transparent
                className="saddle-sell-prof-icons"
                AppendIcon={<EditIcon />}
              />
              <Button
                transparent
                onClick={() => {
                  setters.setDeleteSaddle((prevDeleteSaddle) => [
                    ...new Set([...prevDeleteSaddle, item?.id]),
                  ]);
                  onHandleDelete();
                }}
                className="saddle-sell-prof-icons"
                AppendIcon={<TrashIcon />}
              />

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="saddle-sell-checkbox"
                />
                {/* {item?.status === "SELL_LIVE" && (
                  <Button
                    className="bookevent_btn !text-[12px] ml-[38px]"
                    onClick={() => onHandleUnList(item)}
                    primary
                    whiteOutline
                  >
                    Unlist
                  </Button>
                )} 

                 {["PERSONAL_SCANNED", "SELL_BLOCKED"].includes(
                  item?.status
                ) && (
                  <Button
                    className="bookevent_btn !text-[12px] ml-[38px]"
                    onClick={onSellSaddleHandler}
                    primary
                    whiteOutline
                  >
                    Sell
                  </Button>
                )}  */}

                {/* {["SELL_SOLD", "PERSONAL_PURCHASED"].includes(item?.status) && (
                  <Button
                    className="bookevent_btn !text-[12px] hidden ml-[38px]"
                    onClick={onSellSaddleHandler}
                    primary
                    whiteOutline
                  >
                    {item?.status === "SELL_SOLD" ? "sell" : "resell"}
                  </Button>
                )} */}

                {/* {[
                  "PERSONAL_SCAN",
                  "PERSONAL_PENDING",
                  "SELL_SCAN",
                  "SELL_PENDING",
                ].includes(item?.status) && (
                  <Button
                    className="bookevent_btn !text-[8px] ml-[38px]"
                    whiteOutline
                    primary
                  >
                    Book Event
                  </Button>
                )}  */}
              </label>
            </div>
          </div>

          <div className="w-auto sm:block hidden md:!w-[240px]">
            {calculatingFitScore ? (
              <div className="loader-container !w-[260px] h-full flex justify-center items-center">
                <Loader
                  filledColor="#2b364b"
                  className="w-[30px] h-[30px]  rounded-full !flex !items-center !text-center !justify-center"
                />
              </div>
            ) : (
              <GaugeComponent
                className="table-saddle__title w-[200px] md:w-auto"
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
                value={score && score}
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
            )}
          </div>
        </div>

        {/* {["PERSONAL_SCANNED", "SELL_BLOCKED"].includes(item?.status) && (
          <div className="flex justify-center py-[6.973px] px-[13.945px] rounded-[86.287px] bg-gradient absolute top-[-15px] left-3">
            <span className="text-white text-center text-[10.459px] font-bold leading-[13.945px] tracking-[0.837px] uppercase font-[Montserrat]">
              {item && item?.status.split("_")[1]}
            </span>
          </div>
        )}

        {[
          "PERSONAL_SCAN",
          "PERSONAL_PENDING",
          "SELL_SCAN",
          "SELL_PENDING",
        ].includes(item?.status) && (
          <div className="flex justify-center py-[6.973px] px-[13.945px] rounded-[86.287px] bg-gradient absolute top-[-15px] left-3">
            <span className="text-white text-center text-[10.459px] font-bold leading-[13.945px] tracking-[0.837px] uppercase font-[Montserrat]">
              {item && item?.status.split("_")[1]}
            </span>
          </div>
        )}

        {item?.status === "SELL_LIVE" && (
          <div className="flex justify-center py-[6.973px] px-[13.945px] rounded-[86.287px] bg-gradient absolute top-[-15px] left-3">
            <span className="text-white text-center text-[10.459px] font-bold leading-[13.945px] tracking-[0.837px] uppercase font-[Montserrat]">
              FOR SALE
            </span>
          </div>
        )}

        {item?.status === "SELL_SOLD" && (
          <div className="flex justify-center py-[6.973px] px-[13.945px] rounded-[86.287px] bg-gradient absolute top-[-15px] left-3">
            <span className="text-white text-center text-[10.459px] font-bold leading-[13.945px] tracking-[0.837px] uppercase font-[Montserrat]">
              {item && item?.status.split("_")[1]}
            </span>
          </div>
        )}

        {item?.status === "PERSONAL_PURCHASED" && (
          <div className="flex justify-center py-[6.973px] px-[13.945px] rounded-[86.287px] bg-gradient absolute top-[-15px] left-3">
            <span className="text-white text-center text-[10.459px] font-bold leading-[13.945px] tracking-[0.837px] uppercase font-[Montserrat]">
              {item && item?.status.split("_")[1]}
            </span>
          </div>
        )} */}
      <SellSaddleFormModal />
      </div>
    </>
  );
};

export default UserSaddleCard;
