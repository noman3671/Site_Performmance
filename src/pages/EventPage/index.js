import "./style.css";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { Loader } from "@aws-amplify/ui-react";
import { gql, useQuery } from "@apollo/client";
import { EventsDealer } from "./EventsDealer";
import MapWrapper from "./MapWrapper";
import { AUTHORIZED_DEALERS, LIST_EVENTS } from "apollo/queries/events";
import { useToggleContext } from "context/ToggleContext";
import { useLoggedIn } from "context/LoggedInContext";
import { CustomMapControl } from "./CustomMapControl";
import NoEventIcon from "assets/icons/no-event.svg?react";
import ArrowIcon from "assets/icons/arrow.svg?react";
import EventModal from "../../components/Modal/Event/EventModal";
import { useModalContext } from "context/ModalContext";
import { useLocation, useNavigate } from "react-router-dom";

const Event = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isOpen, setIsAction } = useLoggedIn();
  const { loading, data } = useQuery(gql(LIST_EVENTS), {
    variables: { filter: { country: "USA" } },
  });

  const { data: dataDealers } = useQuery(gql(AUTHORIZED_DEALERS), {
    variables: { country: "USA" },
  });
  const { toggleModal, closeModal } = useModalContext();

  useEffect(() => {
    if (window.innerWidth > 1023) {
      closeModal("isEventModalOpen");
    }
  }, [window.innerWidth]);

  const { selectedEvents, eventToggle, setEventToggle, toggle, setToggle } =
    useToggleContext();
  const [markerCluster, setMarkerCluster] = useState(null);
  const [dealerMarkerCluster, setDealerMarkerCluster] = useState(null);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
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
      <EventsDealer />
      <div className="mb-[169px] relative mx-auto px-[22px] sm:px-2 xl:px-10 2xl:px-0 w-[95%] xl:max-w-[1300px]">
        <div className="max-w-[1300px] h-[623px]  flex items-center gap-4">
          <div className="w-[100%] lg:!w-[69%] 2xl:!w-[70%] mt-[80px] !min-h-[623px]">
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <Loader
                  filledColor="#2b364b"
                  className="!h-[60px] !flex !items-center !text-center !justify-center"
                />
              </div>
            ) : (
              <MapWrapper
                events={data?.listEvents?.items}
                dealers={dataDealers?.listDealers?.items}
                eventToggle={eventToggle}
                setEventToggle={setEventToggle}
                toggle={toggle}
                setToggle={setToggle}
                markerCluster={markerCluster}
                setMarkerCluster={setMarkerCluster}
                dealerMarkerCluster={dealerMarkerCluster}
                setDealerMarkerCluster={setDealerMarkerCluster}
                selectedPlace={selectedPlace}
                setSelectedPlace={setSelectedPlace}
              />
            )}
          </div>
          <div className="w-[368px] lg:block hidden h-[623px] mt-[155px] overflow-hidden bg-white rounded-[10px] border-[0.5px] border-solid border-[#C2C2C2] p-6 gap-2">
            <h2 className="text-[#343434] font-[Montserrat] text-[16px] no-italic font-bold leading-6">
              Events
            </h2>
            {selectedEvents &&
            selectedEvents[0]?.city &&
            selectedEvents[0]?.state ? (
              <p className="text-[#343434] font-[Montserrat] text-[14px] no-italic font-bold leading-6">
                {`${selectedEvents[0].city}, ${selectedEvents[0].state}`}
              </p>
            ) : null}
            {selectedEvents?.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center gap-4">
                  <NoEventIcon />
                  <p className="text-[#808693] font-[Montserrat] text-[16px] no-italic font-normal leading-6">
                    No event selected
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full w-full no-scrollbar overflow-y-scroll overflow-hidden">
                <div className="flex flex-col mt-2 gap-2">
                  {selectedEvents?.map((event, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-[13px]">
                        <img
                          src={event?.image}
                          alt={"Event Image"}
                          className="w-[154.5px] h-[159.667px] rounded-[10px] object-cover"
                        />

                        <div className="flex flex-col">
                          <p className="text-[#343434] font-[Montserrat] text-[18px] no-italic font-normal leading-[16.8px]">
                            {event?.eventName}
                          </p>
                          <p className="text-[#343434] font-[Montserrat] text-[14px] no-italic font-normal leading-[16.8px] mt-3">
                            {event.startDate && event.endDate
                              ? `${dayjs(event?.startDate).format(
                                  "MMM D YYYY"
                                )} - ${dayjs(event?.endDate).format(
                                  "MMM D YYYY"
                                )}`
                              : dayjs(event?.startDate).format("MMM D YYYY")}
                          </p>
                          <div
                            className="flex items-center gap-2 mt-4 cursor-pointer"
                            onClick={() => {
                              setPopupIndex(index);
                              handleBookNow(index);
                            }}
                          >
                            <p className="text-[#2B364B] font-[Montserrat] text-[14px] no-italic font-semibold underline">
                              Book now
                            </p>
                            <ArrowIcon />
                          </div>
                        </div>
                      </div>

                      <div className="w-[100%] h-[1px] bg-[#EAEBED]" />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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
          onModalClose={() => {
            setOpenModalIndex(null);
            setPopupIndex(null);
          }}
          open={openModalIndex !== null}
          rootElement={document.getElementById("root")}
        />
      )}

      <EventModal />
    </>
  );
};

export default Event;
