import Button from "components/Buttons";
import React, { useEffect, useState } from "react";
import WildHorse from "assets/images/horseDefault.png";
import { EditIcon, TrashIcon } from "components/Icons";
import { useHorseContext } from "context/HorseContext";
import { formatDate } from "../../../utils";
import { useNavigate } from "react-router-dom";
// import { AiOutlineEye } from "react-icons/ai";

const HorseProfileCard = ({
  data,
  onHandleEditClick,
  onHandleDelete,
  selectAllHorsesIds,
}) => {
  const navigate = useNavigate();
  const { state, setters } = useHorseContext();
  const [isChecked, setIsChecked] = useState(false);
  const timestamp = data?.createdAt;
  const formattedDate = formatDate(timestamp);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setters.setDeleteHorses((prevDeleteHorses) => [
        ...prevDeleteHorses,
        data?.id,
      ]);
    } else {
      setters.setDeleteHorses((prevDeleteHorses) =>
        prevDeleteHorses.filter((horseId) => horseId !== data?.id)
      );
    }
  };

  useEffect(() => {
    setIsChecked(state.selectAll);
    if (state.selectAll) {
      selectAllHorsesIds();
    } else {
      selectAllHorsesIds(true);
      setIsChecked(false);
    }
  }, [state.selectAll]);

  useEffect(() => {
    setIsChecked(false);
  }, [state.isDeletedSuccessfully]);

  return (
    <>
      <div className="clay-card-dashboard">
        <div className="prof_card_head">
          <h1 className="profile_title_text">Horse profile</h1>
          <div>
            <h1 className="prof-clay-card-text" title={data?.name && data?.name}>
              {data?.name && data?.name}
            </h1>
          </div>
          <img
            src={data?.photo && data?.photo !== "" ? data?.photo : WildHorse}
            alt="horseProfile"
            className="dashboard-horse_prof_img"
          />
        </div>

        <div className="flex gap-5 px-[27px]">
          <Button
            transparent
            className="horse-prof-icons"
            onClick={() => {
              setters.setHorseData(data);
              onHandleEditClick();
            }}
            AppendIcon={<EditIcon />}
          />
          <Button
            transparent
            onClick={() => {
              setters.setDeleteHorses((prevDeleteHorses) => [
                ...new Set([...prevDeleteHorses, data?.id]),
              ]);
              onHandleDelete();
            }}
            className="horse-prof-icons"
            AppendIcon={<TrashIcon />}
          />
          {/* <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="dashboard-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="checkbox-title">Select horse</span>
          </label> */}

          {/* <Button
            transparent
            className="horse-prof-icons"
            AppendIcon={<AiOutlineEye color="#5C80B6" size={16} />}
          /> */}
        </div>
        <div className="prof-schedule-dashboard">
          <div className="w-full flex flex-wrap justify-between">
            <div>
              <h4 className="!text-[12px] sm:!text-[16px]">
                {data?.dob && data?.dob}
              </h4>
              <p className="!text-[10px] sm:!text-[12px]">Date of Birth</p>
            </div>
            <Button
              onClick={() => navigate("/event")}
              className={`scan_horse_btn`}
              primary
              whiteOutline
            >
              Schedule Scan
            </Button>
            <div>
              <h4 className="!text-[12px] sm:!text-[16px]">
                {formattedDate && formattedDate}
              </h4>
              <p className="!text-[10px] sm:!text-[12px]">Last scan</p>
            </div>
          </div>
          {/* last scan needs to be on the right and  create a button that will be titled "Scan Horse" that is centered between DOB and Last scan, this will direct them to the event page, this is going to be kept at all times. We will need to pass this info to calendly if we can pass the horse name */}
        </div>
      </div>
    </>
  );
};

export default HorseProfileCard;