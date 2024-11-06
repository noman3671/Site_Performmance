import React from "react";
import stars_image from "assets/icons/star_img.svg";
import { useHorseContext } from "context/HorseContext";
import HorseFormModal from "components/Modal/Horses/HorseFormModal";
import { useModalContext } from "context/ModalContext";
import CongratsModal from "../../../components/Modal/Horses/CongratsModal";

export const Header = () => {
  const { state } = useHorseContext();

  return (
    <div className="dashboard_head_main mx-auto w-[90%] md:w-full">
      <div className="w-full">
        <img
          src={stars_image}
          className=""
          alt="stars"
        />
        <h1 className="table-header__title">Horse Profile</h1>
        <p className="table-header__subtitle">
        Our innovative platform allows you to create detailed profiles for each horse, capturing critical information such as name, date of birth and riding discipline. SaddleFit’s technology analyzes this data to provide tailored saddle fit recommendations, ensuring comfort and enhanced performance for your horse.
        </p>
        {/* <p className="table-header__subtitle">
          Find the information you have added below.
        </p> */}
      </div>

      <div
        className={`${
          state.data?.listUserHorses.items.length ? "block" : "hidden"
        }  gap-[20px]  lg:gap-[40px] lg:pl-0 flex justify-start w-full xl:w-auto`}
      >
        {/* <Button
          className={`dashboard_select_btn ${
            state.data?.listUserHorses.items.length
              ? ""
              : " bg-slate-300 !opacity-30"
          }`}
          primary
          whiteOutline
          disabled={!state.data?.listUserHorses.items.length}
          onClick={selectBtnOnClickHandler}
        >
          Select All
        </Button>
        <Button
          className={`dashboard_delete_btn ${
            state.deleteHorses.length > 0 ? "" : " bg-slate-300 !opacity-30"
          }`}
          onClick={deleteBtnOnClickHandler}
          disabled={state.deleteHorses.length > 0 ? false : true}
        >
          Delete
        </Button> */}
{/* 
        /// fix the spacing and move the cards up and hide the button /// */}
      </div>
      <HorseFormModal />
      <CongratsModal />
    </div>
  );
};
