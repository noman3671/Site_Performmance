import "./style.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@aws-amplify/ui-react";
import PlusIcon from "assets/icons/plus.svg?react";
import stars_image from "assets/icons/star_img.svg";

import Button from "components/Buttons";
import UserSaddleCard from "./UserSaddleCard";
import { useSaddleContext } from "context/SaddleContext";
import SellSaddleModal from "components/Modal/SellSaddle/SellSaddleModal";
import { useModalContext } from "context/ModalContext";

const MySaddle = () => {
  const navigate = useNavigate();
  const { toggleModal } = useModalContext();
  const { state, actions } = useSaddleContext();

  useEffect(() => {
    actions.fetchListUserSaddleData();
  }, []);

  return (
    <>
      <div className="my-[130px]">
        <div className="sell_saddle_main md:mx-auto w-full">
          <div className="w-[90%] 2xl:w-[1338px] flex flex-wrap justify-start md:justify-between  mx-auto">
            <div>
              <img src={stars_image} alt="stars" />
              <h1 className="sell_saddle__title">My Saddles</h1>
              <p className="sell_saddle-text">Manage My Saddles</p>
            </div>

            {state.data?.listUserSaddles?.items.length > 0 && (
              <div className="gap-[20px] lg:gap-[40px] lg:pl-0 flex mt-5 md:mt-0 md:mx-0 mx-auto w-full md:w-auto justify-start md:justify-end items-end ">
                <Button
                  onClick={actions.selectBtnOnClickHandler}
                  className="sell_saddle_select_btn"
                  primary
                  whiteOutline
                >
                  Select All
                </Button>
                <Button
                  className={`dashboard_delete_btn ${
                    state.deleteSaddle.length > 0
                      ? ""
                      : " bg-slate-300 !opacity-30"
                  }`}
                  onClick={() => toggleModal("isDeleteSaddleModalOpen")}
                  disabled={state.deleteSaddle.length > 0 ? false : true}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="w-[90%] 2xl:w-[1338px] flex gap-x-[28px] justify-start md:justify-start items-center flex-wrap mx-auto">
          <div className="clay-card-sell_saddle w-full sm:w-[650px]">
            <h1 className="sell_saddle_title_text">Saddle Inventory</h1>
            <div className="sell_saddle_card_head">
              <h1 className="clay-card-text-sell_saddle">Add now</h1>
              <Button
                transparent
                className="sell_saddle_plus_icon"
                onClick={() => navigate("/user/my-saddle/create")}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          {state.loading ? (
            <div className="flex justify-center items-center w-[427px]">
              <Loader
                filledColor="#2b364b"
                className="!h-[50px] !flex !items-center !text-center !justify-center"
              />
            </div>
          ) : (
            state.data?.listUserSaddles?.items.map((item, index) => {
              return (
                <UserSaddleCard
                  item={item}
                  key={index}
                  index={index}
                  selectAllSaddleIds={actions.selectAllSaddleIds}
                  onHandleDelete={() => toggleModal("isDeleteSaddleModalOpen")}
                />
              );
            })
          )}
        </div>
        {state.data?.listUserSaddles?.nextToken && (
          <div className="flex justify-center mx-auto">
            <Button
              className="load_more_btn mt-[20px]"
              primary
              whiteOutline
              loading={state.loading}
              onClick={actions.loadMoreBtnHandler}
            >
              load more
            </Button>
          </div>
        )}
      </div>
      <SellSaddleModal />
    </>
  );
};

export default MySaddle;
