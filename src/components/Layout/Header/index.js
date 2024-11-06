import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import bottom_line from "assets/images/bottom-line.png";
import menuIcon from "assets/icons/MenuIcon.svg";
import saddle_logo from "assets/icons/saddleLogo.svg";
import mob_saddle_logo from "assets/icons/mob_logo.svg";
import Button from "components/Buttons";
import { UnionIcon } from "components/Icons";
import StoreButton from "components/Common/Navigation/StoreButton";
import FavoritesButton from "components/Common/Navigation/FavoritesButton";
import UserAuthorizedTab from "components/Common/UserAuthorizedTab";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom-middleware";
import { useScrollContext } from "context/ScrollContext";
import { useLoggedIn } from "context/LoggedInContext";
import { useCartContext } from "context/CartContext";
import heartRoundedIcon from "../../../assets/icons/heartroundedIcon.svg";
// import useScreenSize from "hooks/useScreenSize";
import { gql, useLazyQuery } from "@apollo/client";
import { LIST_SADDLE_FAVOURITES_BY_USER } from "apollo/queries/saddleFavorite";
import { getCurrentUser } from "aws-amplify/auth";
import { useModalContext } from "context/ModalContext";

const Header = () => {
  const { user, reset, setIsAction, setIsOpen, toggle, setToggle } =
    useLoggedIn();
  const { userCartData } = useCartContext();
  // const { toggle, setToggle } = useScreenSize();
  const navRef = useRef(null);

  const navigate = useNavigate();
  let location = useLocation();
  const params = useParams();
  const { scrollFunctions } = useScrollContext();
  const { toggleModal } = useModalContext();

  const [
    getlistSaddleFavouriteByUser,
    { data: listSaddleFavouriteByUserData },
  ] = useLazyQuery(gql(LIST_SADDLE_FAVOURITES_BY_USER));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(".menu-icon")
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggle]);

  const onSignUpHandler = async () => {
    navigate("/signup", {
      state: { backgroundLocation: location },
    });
  };
  const onSignInHandler = async () => toggleModal("isLoginModalOpen");
  const onSignOutHandler = async () => {
    try {
      setToggle(false);
      await signOut();
      setIsAction(null);
      setIsOpen(false);
      reset();
      navigate("/");
      localStorage.removeItem(`cart${user?.sub}`);
    } catch (error) {}
  };

  const hideGradientColor =
    location.pathname === "/terms-and-conditions" ||
    location.pathname === "/privacy-policy" ||
    location.pathname === "/user/horses" ||
    location.pathname === "/buy" ||
    location.pathname === `/saddle/${params?.id}` ||
    location.pathname === "/event" ||
    location.pathname === "/profile" ||
    location.pathname === "/buy-sell" ||
    location.pathname === "/favorite" ||
    location.pathname === "/user/sell-saddle" ||
    location.pathname === "/user/my-saddle" ||
    location.pathname === "/user/sell-saddle/create" ||
    location.pathname === "/user/my-saddle/create" ||
    location.pathname === "/user/my-saddle/edit" ||
    location.pathname === "/user/sell-saddle/edit" ||
    location.pathname === "/partner" ||
    location.pathname === "/cart" ||
    location.pathname === "/cactus";

  useEffect(() => {
    const fetchlistSaddleFavouriteByUserData = async () => {
      try {
        const { username } = await getCurrentUser();

        if (username) {
          await getlistSaddleFavouriteByUser();
        }
      } catch (error) {}
    };
    fetchlistSaddleFavouriteByUserData();
  }, []);

  return (
    <>
      <div
        className={`${hideGradientColor ? "hide_gradient" : "gradient"}`}
      ></div>
      <div
        className={
          hideGradientColor
            ? "hide_gradient z-30"
            : `left-0 right-0 
            ${
              toggle ? "fixed bg-[#2B364B]" : "absolute"
            } top-[0px] z-10 lg:bg-transparent `
        }
      >
        <div className="w-full h-[95px] pt-8 md:pt-6 lg:pt-6">
          <div className="flex px-[22px] sm:px-2 xl:px-10 2xl:px-0 w-[95%] xl:max-w-[1300px] mx-auto  justify-between  items-center">
            <NavLink to="/">
              <img
                src={saddle_logo}
                alt="logo"
                className="lg:flex w-[180px] lg:w-[143px] lg:h-[55px] xl:w-[232px]  hidden"
              />
              <img
                src={mob_saddle_logo}
                alt="logo"
                className="lg:hidden flex"
              />
            </NavLink>
            <div className="hidden ml-[40px] lg:flex items-center lg:gap-[20px] xl:gap-[40px]">
              {user ? (
                <>
                  {/* <NavLink
                    to="/user/horses"
                    className={`nav_links text-[16px] ${
                      location.pathname === "/user/horses"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    }  text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    My Horses
                  </NavLink>
                  <NavLink
                    to="/user/my-saddle"
                    className={`nav_links text-[16px] ${
                      location.pathname === "/user/my-saddle"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    My Saddles
                  </NavLink> */}
                  {/* ///this page will be for just a user with saddles in inventory without selling. It will have a button to sell if they want to./// */}
                  {/* <NavLink
                    to="/user/sell-saddle"
                    className={`nav_links text-[16px] ${location.pathname === "/user/sell-saddle"
                      ? "border-b-2 border-[#5C80B6]"
                      : ""
                      } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Sell a Saddle
                  </NavLink> */}

                 {user && <NavLink
                    to="/buy"
                    className={`nav_links text-[16px] ${
                      location.pathname === "/buy" ||
                      location.pathname === `/saddle/${params?.id}`
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Buy a Saddle
                  </NavLink>}

                  <NavLink
                    to="/event"
                    className={`nav_links text-[16px] ${
                      location.pathname === "/event"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Schedule Now
                  </NavLink>
                  <NavLink
                    to="/cactus"
                    className={`nav_links text-[16px] ${
                      location.pathname === "/cactus"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Cactus
                  </NavLink>
                  {user && (
                    <>
                      <div className="relative">
                        <StoreButton
                          className={"text-transparent bg-transparent"}
                        />
                        {userCartData?.items?.length > 0 && (
                          <div className="bg-red-500 w-6 h-6 text-[12px] cartItemNumber rounded-full  text-white absolute top-[-16px] right-[-18px] flex justify-center items-center">
                            {userCartData?.items?.length}
                          </div>
                        )}
                      </div>

                      {/* <div className="relative">
                        <FavoritesButton
                          className={"text-transparent bg-transparent"}
                        />
                        {listSaddleFavouriteByUserData
                          ?.listUserSaddleFitFavorites?.items?.length > 0 && (
                          <img
                            src={heartRoundedIcon}
                            alt="heartRoundedIcon"
                            className="absolute top-0 right-[-2px]"
                          />
                        )}
                      </div> */}
                    </>
                  )}

                  <UserAuthorizedTab />
                  <Button
                    size
                    whiteOutline
                    className={"nav_outline_btn"}
                    transparent
                    onClick={onSignOutHandler}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <ul className="lg:flex gap-x-8 lg:gap-x-4 xl:gap-x-8">
                    <a
                      onClick={() => {
                        if (
                          location.pathname === "/partner" ||
                          location.pathname === "/privacy-policy" ||
                          location.pathname === "/terms-and-conditions" ||
                          location.pathname === "/event"
                        ) {
                          setToggle(false);
                          navigate("/");
                          setTimeout(() => {
                            scrollFunctions.scrollToSecOne();
                          }, 0);
                        } else {
                          setToggle(false);
                          scrollFunctions.scrollToSecOne();
                        }
                      }}
                      className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                    >
                      Why SaddleFit
                    </a>

                    <a
                      onClick={() => {
                        if (
                          location.pathname === "/partner" ||
                          location.pathname === "/privacy-policy" ||
                          location.pathname === "/terms-and-conditions" ||
                          location.pathname === "/event"
                        ) {
                          setToggle(false);
                          navigate("/");
                          setTimeout(() => {
                            scrollFunctions.scrollToSecTwo();
                          }, 0);
                        } else {
                          setToggle(false);
                          scrollFunctions.scrollToSecTwo();
                        }
                      }}
                      className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                    >
                      How it works
                    </a>
                    {/* please add link to the booking portion of the page */}
                    <a
                      onClick={() => {
                        if (
                          location.pathname === "/partner" ||
                          location.pathname === "/privacy-policy" ||
                          location.pathname === "/terms-and-conditions" ||
                          location.pathname === "/event"
                        ) {
                          setToggle(false);
                          navigate("/", {
                            state: { scrollToSecFive: true },
                          });
                          setTimeout(() => {
                            scrollFunctions.scrollToSecFive();
                          }, 0);
                        } else {
                          setToggle(false);
                          scrollFunctions.scrollToSecFive();
                        }
                      }}
                      className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                    >
                      Book Appointment
                    </a>

                 {user &&   <a
                      onClick={() => {
                        navigate("/buy");
                        setToggle(false);
                      }}
                      // onClick={() => {
                      //   if (
                      //     location.pathname === "/partner" ||
                      //     location.pathname === "/privacy-policy" ||
                      //     location.pathname === "/terms-and-conditions" ||
                      //     location.pathname === "/event"
                      //   ) {
                      //     setToggle(false);
                      //     navigate("/");
                      //     setTimeout(() => {
                      //       scrollFunctions.scrollToSecThree();
                      //     }, 0);
                      //   } else {
                      //     setToggle(false);
                      //     scrollFunctions.scrollToSecThree();
                      //   }
                      // }}
                      className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                    >
                      Buy a Saddle
                    </a>}
                    <NavLink
                      to="/event"
                      className={`nav_links text-[16px] ${
                        location.pathname === "/event"
                          ? "border-b-2 border-[#5C80B6]"
                          : ""
                      } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                    >
                      Schedule Now
                    </NavLink>
                    <NavLink
                      to="/cactus"
                      className={`nav_links text-[16px] ${
                        location.pathname === "/cactus"
                          ? "border-b-2 border-[#5C80B6]"
                          : ""
                      } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                    >
                      Cactus
                    </NavLink>
                  </ul>
                  <div className="flex lg:w-auto w-[220px] justify-end sm:flex sm:justify-end md:justify-between lg:justify-around items-center">
                    <div className=" lg:flex items-center gap-[10px]">
                      <Button
                        size
                        whiteOutline
                        className={"nav_outline_btn"}
                        transparent
                        onClick={onSignInHandler}
                      >
                        Sign in
                      </Button>
                      <Button
                        size
                        className={"nav_btn"}
                        AppendIcon={UnionIcon}
                        onClick={onSignUpHandler}
                      >
                        Join now
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="lg:hidden flex items-center gap-5">
              {user && (
                <>
                  <div className="relative">
                    <StoreButton
                      className={"text-transparent bg-transparent"}
                    />
                    {userCartData?.items?.length > 0 && (
                      <div className="bg-red-500 w-6 h-6 text-[12px] cartItemNumber rounded-full  text-white absolute top-[-16px] right-[-18px] flex justify-center items-center">
                        {userCartData?.items?.length}
                      </div>
                    )}
                  </div>
                  {/* <div className="relative">
                    <FavoritesButton
                      className={"text-transparent bg-transparent"}
                    />
                    {listSaddleFavouriteByUserData?.listUserSaddleFitFavorites
                      ?.items?.length > 0 && (
                      <img
                        src={heartRoundedIcon}
                        alt="heartRoundedIcon"
                        className="absolute top-0 right-[-2px]"
                      />
                    )}
                  </div>{" "} */}
                </>
              )}
              <img
                src={menuIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setToggle(!toggle);
                }}
                className="menu-icon cursor-pointer duration-200"
              />
            </div>

            <ul
              ref={navRef}
              className={`lg:hidden  flex items-center mb-[93px] pt-[50px] w-full left-0 md:w-full bg-[#2B364B] flex-col gap-[12px] fixed p-5 px-10 md:right-[70px]  ${
                toggle ? "top-[68px]" : "top-[-1000%]"
              }  `}
            >
              {user ? (
                <>
                  <NavLink
                    to="/user/horses"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                  >
                    My Horses
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />
                  <NavLink
                    to="/user/my-saddle"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                  >
                    My Saddles
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />
                  {user && (
                    <NavLink
                      to="/buy"
                      onClick={() => setToggle(false)}
                      className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                    >
                      Buy a saddle
                    </NavLink>
                  )}
                  <img src={bottom_line} alt="bottom-line" />
                  {/* <NavLink
                    to="/user/my-saddle"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                  >
                    Sell a Saddle
                  </NavLink>{" "} */}
                  {/* <img src={bottom_line} alt="bottom-line" /> */}
                  <NavLink
                    to="/event"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                  >
                    Schedule Now
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />
                  <NavLink
                    to="/cactus"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                  >
                    Cactus
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />
                  <NavLink
                    to="/profile"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                  >
                    Update Profile
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />
                  {/* <NavLink
                    to="/buy-sell"
                    onClick={() => setToggle(false)}
                    className="nav_links text-[16px] text-[#F7F7F6] hover:cursor-pointer font-medium"
                  >
                    Orders
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" /> */}
                  <Button
                    size
                    className={"nav_outline_btn"}
                    transparent
                    onClick={onSignOutHandler}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      if (
                        location.pathname === "/partner" ||
                        location.pathname === "/privacy-policy" ||
                        location.pathname === "/terms-and-conditions" ||
                        location.pathname === "/event"
                      ) {
                        setToggle(false);
                        navigate("/");
                        setTimeout(() => {
                          scrollFunctions.scrollToSecOne();
                        }, 0);
                      } else {
                        setToggle(false);
                        scrollFunctions.scrollToSecOne();
                      }
                    }}
                    className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                  >
                    Why SaddleFit
                  </a>
                  <img src={bottom_line} alt="bottom-line" />
                  <a
                    onClick={() => {
                      if (
                        location.pathname === "/partner" ||
                        location.pathname === "/privacy-policy" ||
                        location.pathname === "/terms-and-conditions" ||
                        location.pathname === "/event"
                      ) {
                        setToggle(false);
                        navigate("/");
                        setTimeout(() => {
                          scrollFunctions.scrollToSecTwo();
                        }, 0);
                      } else {
                        setToggle(false);
                        scrollFunctions.scrollToSecTwo();
                      }
                    }}
                    className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                  >
                    How it works
                  </a>
                  <img src={bottom_line} alt="bottom-line" />

                  {user && (
                    <a
                      onClick={() => {
                        navigate("/buy");
                        setToggle(false);
                        // if (
                        //   location.pathname === "/partner" ||
                        //   location.pathname === "/privacy-policy" ||
                        //   location.pathname === "/terms-and-conditions" ||
                        //   location.pathname === "/event"
                        // ) {
                        //   setToggle(false);
                        //   navigate("/");
                        //   setTimeout(() => {
                        //     scrollFunctions.scrollToSecThree();
                        //   }, 0);
                        // } else {
                        //   setToggle(false);
                        //   scrollFunctions.scrollToSecThree();
                        // }
                      }}
                      className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                    >
                      Buy a Saddle
                    </a>
                  )}
                  <img src={bottom_line} alt="bottom-line" />
                  <a
                    onClick={() => {
                      if (
                        location.pathname === "/partner" ||
                        location.pathname === "/privacy-policy" ||
                        location.pathname === "/terms-and-conditions" ||
                        location.pathname === "/event"
                      ) {
                        setToggle(false);
                        navigate("/", {
                          state: { scrollToSecFive: true },
                        });
                        setTimeout(() => {
                          scrollFunctions.scrollToSecFive();
                        }, 0);
                      } else {
                        setToggle(false);
                        scrollFunctions.scrollToSecFive();
                      }
                    }}
                    className="nav_links text-[16px] text-[#F7F7F6] font-medium"
                  >
                    Book Appointment
                  </a>
                  <img src={bottom_line} alt="bottom-line" />

                  <NavLink
                    to="/event"
                    onClick={() => setToggle(false)}
                    className={`nav_links text-[16px] ${
                      location.pathname === "/event"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Schedule Now
                  </NavLink>
                  <img src={bottom_line} alt="bottom-line" />

                  <NavLink
                    to="/cactus"
                    onClick={() => setToggle(false)}
                    className={`nav_links text-[16px] ${
                      location.pathname === "/cactus"
                        ? "border-b-2 border-[#5C80B6]"
                        : ""
                    } text-[#F7F7F6] hover:cursor-pointer font-medium`}
                  >
                    Cactus
                  </NavLink>
                  {/* <img src={bottom_line} alt="bottom-line" /> */}

                  <div className="flex flex-col mt-[24px] justify-center mb-[24px] items-center gap-[24px]">
                    <Button
                      size
                      className={" nav_outline_btn "}
                      transparent
                      onClick={onSignInHandler}
                    >
                      Sign in
                    </Button>
                    <Button
                      size
                      className={"nav_btn"}
                      AppendIcon={UnionIcon}
                      onClick={onSignUpHandler}
                    >
                      {" "}
                      Join now
                    </Button>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
