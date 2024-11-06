import React, { useEffect } from "react";
import HorseCard from ".";
import Button from "components/Buttons";
import { Loader } from "@aws-amplify/ui-react";
import PlusIcon from "assets/icons/plus.svg?react";
import { useHorseContext } from "context/HorseContext";
import { useModalContext } from "context/ModalContext";

export const HorseCards = () => {
  const { state, setters, actions } = useHorseContext();
  const { toggleModal } = useModalContext();

  const onHandleAddClick = () => toggleModal("isAddHorseModalOpen");
  const onHandleEditClick = () => toggleModal("isEditHorseModalOpen");
  const onHandleDelete = () => toggleModal("isDeleteHorseModalOpen");

  useEffect(() => {
    actions.fetchHorseData();
  }, []);

  const selectAllHorsesIds = (isEmpty = false) => {
    if (!isEmpty) {
      const allHorsesIds = state.data?.listUserHorses?.items.map(
        (item, i) => item?.id
      );
      setters.setDeleteHorses(allHorsesIds);
    } else {
      setters.setDeleteHorses([]);
    }
  };

  return (
    <>
      <div className="flex gap-[20px] flex-wrap mx-auto w-[90%] md:w-full justify-start">
        <div className="clay-card-dashboard">
          <h1 className="profile_title_text">Horse profile</h1>
          <div className="prof_card_head">
            <h1 className="clay-card-text-dashboard">Add Horse</h1>
            <Button
              onClick={onHandleAddClick}
              transparent
              className="decor_plus_icon_dashboard"
            >
              <PlusIcon />
            </Button>
          </div>
          <div className="prof-schedule-dashboard">
            <div className="w-full flex gap-[41px]">
              <div>
                <h4>-</h4>
                <p>Date of Birth</p>
              </div>
              <div>
                <h4>-</h4>
                <p>Last scan</p>
              </div>
            </div>
          </div>
        </div>

        {state?.loading ? (
          <div className="flex justify-center items-center w-[427px]">
            <Loader
              filledColor="#2b364b"
              className="!h-[50px] !flex !items-center !text-center !justify-center"
            />
          </div>
        ) : (
          state.data?.listUserHorses?.items.map((item, i) => (
            <div className="w-full lg:w-[427px]" key={i}>
              <HorseCard
                data={item}
                onHandleDelete={onHandleDelete}
                onHandleEditClick={onHandleEditClick}
                selectAllHorsesIds={selectAllHorsesIds}
              />
            </div>
          ))
        )}
      </div>
      {state.data?.listUserHorses?.nextToken && (
        <div className="flex justify-center mx-auto">
          <Button
            className="load_more_btn mt-[20px]"
            primary
            whiteOutline
            loading={state.isHorsesLoading}
            onClick={actions.loadMoreHorses}
          >
            load more
          </Button>
        </div>
      )}
    </>
  );
};
