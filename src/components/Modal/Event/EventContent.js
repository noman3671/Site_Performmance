import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import EventVectorIcon from "assets/icons/EventVectorIcon.svg?react";
import CloseIcon from "assets/icons/closeIcon.svg?react";
import ArrowIcon from "assets/icons/arrow.svg?react";
import { useLoggedIn } from "context/LoggedInContext";
import { useModalContext } from "context/ModalContext";
import { useToggleContext } from "context/ToggleContext";
import { PopupModal } from "react-calendly";
import { useLocation, useNavigate } from "react-router-dom";

function EventContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setIsAction } = useLoggedIn();
  const { closeModal } = useModalContext();
  const { selectedEvents, setSelectedEvents } = useToggleContext();
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);

  const handleBookNow = (index) => {
    setIsAction("BookEvent");
    if (user) {
      setOpenModalIndex(index);
    } else {
      navigate("/signup", {
        state: { backgroundLocation: location },
      });
    }
  };

  useEffect(() => {
    if (user) {
      setOpenModalIndex(popupIndex);
    }
  }, [user]);
  
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="flex">
          <EventVectorIcon className="w-[50px] h-[50px]" />
          {selectedEvents &&
          selectedEvents[0]?.city &&
          selectedEvents[0]?.state ? (
            <p className="font-[Montserrat] font-[700] text-[#343434] flex justify-center items-center text-[24px] ml-[8px]">
              {`${selectedEvents[0].city}, ${selectedEvents[0].state}`}
            </p>
          ) : null}
        </div>
        <CloseIcon
          className="cursor-pointer w-[50px] h-[50px]"
          onClick={() => {
            closeModal("isEventModalOpen");
            setSelectedEvents([]);
          }}
        />
      </div>
      <div className="min-h-[100px] max-h-[300px] mt-[13px]  overflow-y-scroll no-scrollbar overflow-hidden">
        {selectedEvents?.map((event, index) => (
          <>
            <div className="flex items-center gap-[13px] ">
              <img
                src={event?.image}
                className="w-[150px] h-[120px] rounded-[10px] object-cover"
              />

              <div className="flex flex-col">
                <p className="text-[#343434] font-[Montserrat] text-[20px] no-italic font-normal leading-[17.6px]">
                  {event?.eventName}
                </p>
                <p className="text-[#343434] font-[Montserrat] text-[16px] no-italic font-normal leading-[14.4px] mt-3">
                  {event.startDate && event.endDate
                    ? `${dayjs(event?.startDate).format(
                        "MMM D YYYY"
                      )} - ${dayjs(event?.endDate).format("MMM D YYYY")}`
                    : dayjs(event?.startDate).format("MMM D YYYY")}
                </p>
                <div
                  onClick={() => {
                    setPopupIndex(index);
                    handleBookNow(index);
                  }}
                  className="flex items-center gap-2 mt-4"
                >
                  <p className="text-[#2B364B] font-[Montserrat] text-[16px] no-italic font-semibold underline">
                    Book now
                  </p>
                  <ArrowIcon />
                </div>
              </div>
            </div>

            <div className="w-[100%] h-[1px] bg-[#EAEBED] mt-[13px]" />
          </>
        ))}
      </div>

      {openModalIndex !== null && (
        <PopupModal
          pageSettings={{
            backgroundColor: "#2b364b",
            textColor: "#fff",
            primaryColor: "#fff",
          }}
          url={selectedEvents[openModalIndex]?.bookNowUrl}
          prefill={{ email: user?.email }}
          onModalClose={() => setOpenModalIndex(null)}
          open={openModalIndex !== null}
          rootElement={document.getElementById("root")}
        />
      )}
    </>
  );
}

export default EventContent;
