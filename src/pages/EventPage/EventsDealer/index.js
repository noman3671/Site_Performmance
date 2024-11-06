import LocationPicImg from "assets/icons/dashboard/pin-location.png";
import "./style.css";

export const EventsDealer = () => {
  return (
    <>
      <div className="flex mx-auto justify-center md:mt-auto w-full">
        <div className="find-event_main mt-[140px] lg:mt-[102px]">
          <div className="flex flex-col lg:items-start w-[620px] xl:w-auto">
            <h1 className="find-event-text">
              Find a SaddleFit Event Near you{" "}
            </h1>
            <p className="events_descrip">
              Use this map to find a SaddleFit event near you where you can have
              your horse 3D scanned.  Take the guesswork out of finding your
              best fitting saddle with SaddleFit. 
            </p>
          </div>
          <img src={LocationPicImg} alt="pin" className="lg:block hidden" />
        </div>
      </div>
    </>
  );
};
