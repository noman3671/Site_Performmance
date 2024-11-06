import "./style.css";
import React, { useEffect, useState } from "react";
import stars_image from "assets/icons/star_img.svg";
import Button from "components/Buttons";
import { useCartContext } from "context/CartContext";
import CartItemCard from "./CartItemCard";
import { SADDLE_CHECKOUT } from "apollo/mutations/saddle";
import { gql, useMutation } from "@apollo/client";
import { useLoggedIn } from "context/LoggedInContext";
import { Loader } from "@aws-amplify/ui-react";
import { createToast } from "utils/Toast";

const Toast = createToast();

const CartPage = () => {
  const {
    setSelectCartItem,
    selectCartItem,
    setSelectedAllCartItems,
    setIsCartRemoved,
    userCartData,
    listCartLoading,
    removeCartLoading,
    REMOVE_CART,
  } = useCartContext();
  console.log({ selectCartItem });
  const [price, setPrice] = useState(0);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [addSaddleFitReportTax, setAddSaddleFitReportTax] = useState(false);
  const [saddleCheckout, { loading }] = useMutation(gql(SADDLE_CHECKOUT));

  const handleRemove = async (id) => {
    setLoadingItemId(id);
    try {
      await REMOVE_CART({
        variables: { input: { saddleIds: [id] } },
        refetchQueries: ["listCartByUserId"],
      });
      setIsCartRemoved((prev) => !prev);
      handlePrice();
    } catch (error) {
      console.error("Error removing item:", error.message);
    } finally {
      setLoadingItemId(null);
    }
  };

  const handlePrice = () => {
    const totalPrice =
      userCartData?.items.length > 0 &&
      userCartData?.items?.reduce((accumulator, currentValue) => {
        if (currentValue?.hasSaddleFitReport) {
          return accumulator + currentValue?.saddleData?.price + 100;
        } else {
          return accumulator + currentValue?.saddleData?.price;
        }
      }, 0);
    setPrice(totalPrice);
  };

  useEffect(() => {
    handlePrice();
  });

  const proceedBtnHandler = async () => {
    if (userCartData?.items?.length > 0) {
      const itemIds =
        userCartData?.items.length > 0 &&
        userCartData?.items?.map((data) => data?.saddleData?.id);
      try {
        if (klaviyo) {
          klaviyo.push(["track", "Started Checkout"]);
        }
        const response = await saddleCheckout({
          variables: {
            input: {
              saddleIds: itemIds,
            },
          },
        });
        const sessionURL = response.data.saddleCheckout.sessionURL;
        if (sessionURL) {
          await removeSelectCartItemHandler();
          window.location.href = sessionURL;
        }
      } catch (error) {
        console.error("Mutation error:", error.message);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    }
  };

  const removeSelectCartItemHandler = async () => {
    if (selectCartItem.length > 0) {
      await REMOVE_CART({
        variables: { input: { saddleIds: selectCartItem } },
        refetchQueries: ["listCartByUserId"],
      });
      setIsCartRemoved((prev) => !prev);
      setSelectCartItem([]);
    }
  };

  const selectAllHandler = () => {
    setSelectedAllCartItems((prev) => !prev);
    let idsArr = [];
    idsArr =
      userCartData?.items?.length > 0 &&
      userCartData?.items?.map((item) => {
        return item?.saddleData?.id;
      });
    setSelectCartItem(idsArr);
  };

  const setSaddleFitReportPrice = () => {
    setAddSaddleFitReportTax(true);
  };

  const formateNumber = (number) => {
    return number && number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (listCartLoading) {
    return (
      <div className="flex justify-center  h-screen items-center w-full">
        <Loader
          filledColor="#2b364b"
          className="!h-[60px] !flex !items-center !text-center !justify-center"
        />
      </div>
    );
  }

  return (
    <div className="my-[120px]">
      <div className="md:flex flex-wrap  justify-between w-[90%] 2xl:w-[1338px] mx-auto">
        <div>
          <img src={stars_image} alt="stars" />
          <h1 className="cart__title">Shopping cart</h1>
          <p className="cart-text">Find the Best fit!</p>
        </div>
        {userCartData?.items?.length > 0 && (
          <div className="hidden md:flex gap-10 my-auto">
            <Button
              whiteOutline
              className="cart_select_btn"
              primary
              onClick={selectAllHandler}
            >
              Select All
            </Button>
            <Button
              className={`dashboard_delete_btn ${
                selectCartItem.length ? "" : " bg-slate-300 !opacity-30"
              }`}
              // disabled={selectCartItem.length > 0 ? false: true}
              loadingColor="#2b364b"
              loading={removeCartLoading}
              disabled={!selectCartItem.length}
              onClick={removeSelectCartItemHandler}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      <div className="w-[90%]  2xl:w-[1338px] flex flex-col-reverse  xl:flex-row gap-x-[30px] mx-auto xl:mt-[76px]">
        <div className="w-full  xl:w-[883px] mx-auto 2xl:mx-0  flex flex-col gap-y-[24px]">
          {userCartData?.items?.length > 0 ? (
            userCartData?.items?.map((elem, i) => (
              <CartItemCard
                key={i}
                data={elem}
                handleRemove={(id) => handleRemove(id)}
                loading={loadingItemId === elem?.saddleData?.id}
                setSaddleFitReportPrice={setSaddleFitReportPrice}
              />
            ))
          ) : (
            <div className="no_cart_added flex justify-center items-center mt-20 2xl:mt-0 !mx-auto text-center 2xl:w-[1338px]">
              No Item in Cart
            </div>
          )}
        </div>
        {userCartData?.items?.length > 0 && (
          <div className="w-full lg:w-[427px]  h-[255px] xl:border-[#999] xl:border flex justify-start xl:justify-center items-center rounded-[10px]">
            <div className="w-[323px] h-[65%] flex flex-col justify-between">
              <div>
                <p className="subtotal">Subtotal</p>
                <p className="cart_price">
                  ${formateNumber(price)}
                  {/* {addSaddleFitReportTax
                    ? formateNumber(price + 100)
                    : formateNumber(price)} */}
                </p>
              </div>
              <Button
                whiteOutline
                className="proceed_btn"
                primary
                onClick={proceedBtnHandler}
              >
                {loading ? (
                  <Loader
                    filledColor="#2b364b"
                    className="!h-[30px] !animate-spin !flex !items-center !mt-[-6px] !text-center !justify-center"
                  />
                ) : (
                  "Proceed to checkout"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
