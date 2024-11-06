import "./style.css";
import tw, { css } from "twin.macro";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom-middleware";
import { ArrowUpIcon, EditClientIcon } from "components/Icons";
import { useLoggedIn } from "context/LoggedInContext";
import { signOut } from "aws-amplify/auth";
import { useApolloClient } from "@apollo/client";
import clientProfileImage from "../../assets/images/clientProfileImage.png";
import { ThreeDots } from "react-loading-icons";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { GiSaddle } from "react-icons/gi";

export default () => {
  const client = useApolloClient();
  const {
    user,
    reset,
    setIsAction,
    setIsOpen,
    isClientDataLoading,
    clientData,
  } = useLoggedIn();

  const navigate = useNavigate();
  const [isProfileLinksVisible, setIsProfileLinksVisible] = useState(false);
  const profileLinksRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileLinksRef.current &&
        !profileLinksRef.current.contains(event.target)
      ) {
        setIsProfileLinksVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileLinksRef]);

  const onArrowUpClick = () => {
    setIsProfileLinksVisible(!isProfileLinksVisible);
  };

  const onSignOutHandler = async () => {
    try {
      await signOut();
      client.resetStore();
      setIsAction(null);
      setIsOpen(false);
      reset();
      navigate("/");
      localStorage.removeItem(`cart${user?.sub}`);
    } catch (error) {}
  };

  if (isClientDataLoading)
    return <ThreeDots fill="white" height={50} width={50} />;

  return (
    user && (
      <>
        <div
          onClick={onArrowUpClick}
          className={`cursor-pointer flex gap-[17px] items-center`}
        >
          {clientData?.user?.photo ? (
            <img
              src={clientData?.user?.photo}
              className="w-[28px] h-[28px] rounded-full object-contain"
            />
          ) : (
            <img
              src={clientProfileImage}
              alt="clientProfileImage"
              className="w-[28px] h-[28px] rounded-full object-contain"
            />
          )}
          <span css={[nameStyle]}>{clientData?.user?.firstName}</span>
          <div className="relative" ref={profileLinksRef}>
            <div className="cursor-pointer">
              <ArrowUpIcon />
            </div>
            {isProfileLinksVisible && (
              <div
                className={`profile_links absolute right-0 top-3 mt-2 py-2 w-[160px] bg-white rounded-md shadow-xl z-20 ${
                  isProfileLinksVisible ? "block" : "hidden"
                }`}
              >
                <Link
                  to={"user/horses"}
                  className="flex pl-3 items-center gap-3 hover:bg-gray-100"
                >
                  <LiaHorseHeadSolid size={20} color="#5C80B6" />
                  <span className="client-links block  py-2 text-[12px] text-sm text-gray-700 hover:bg-gray-100">
                    My Horse
                  </span>
                </Link>
                <Link
                  to={"user/my-saddle"}
                  className="flex pl-3 items-center gap-3 hover:bg-gray-100"
                >
                  <GiSaddle size={20} color="#5C80B6" />
                  <span className="client-links block  py-2 text-[12px] text-sm text-gray-700 hover:bg-gray-100">
                    My Saddles
                  </span>
                </Link>
                <Link
                  to={"/profile"}
                  className="flex pl-3 items-center gap-3 hover:bg-gray-100"
                >
                  <EditClientIcon className="!text-transparent" />
                  <span className="client-links block  py-2 text-[12px] text-sm text-gray-700 hover:bg-gray-100">
                    Update Profile
                  </span>
                </Link>
                {/* className="!text-transparent" /> */}
                {/* <div
                  onClick={() => navigate("/buy-sell")}
                  className="flex pl-3 items-center gap-3 hover:bg-gray-100"
                >
                  <ShopIconSvg />
                  <Link className="client-links block  py-2 text-[12px] text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

const nameStyle = css`
  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 80% */
  // ${tw`ml-[53px] mr-[20px]`}
`;
