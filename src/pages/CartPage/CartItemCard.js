import React, { useEffect, useState } from "react";
import { useCartContext } from "context/CartContext";
import { getItemFromStorage } from "utils/localStorage";
import { useLoggedIn } from "context/LoggedInContext";
import Gauge from "components/Guage/Guage";
import { Loader } from "@aws-amplify/ui-react";

const CartItemCard = ({
  data,
  loading,
  handleRemove,
  setSaddleFitReportPrice,
}) => {
  const { user } = useLoggedIn();
  const [isChecked, setIsChecked] = useState(false);
  const [isSaddleFitReportChecked, setIsSaddleFitReportChecked] =
    useState(false);
  const { setSelectCartItem, selectedAllCartItems, isCartRemoved } =
    useCartContext();

  const checkboxHandler = (event, item) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setSelectCartItem((prevCartItem) => {
        return [...prevCartItem, item?.saddleData?.id];
      });
    } else {
      setSelectCartItem((prevCartItem) =>
        prevCartItem.filter((cartId) => {
          return cartId !== item?.saddleData?.id;
        })
      );
    }
  };

  useEffect(() => {
    if (selectedAllCartItems) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
      setSelectCartItem([]);
    }
  }, [selectedAllCartItems]);

  useEffect(() => {
    setIsChecked(false);
  }, [isCartRemoved]);

  useEffect(() => {
    const cartDataFromLocalStorage = getItemFromStorage(`cart${user?.sub}`);
    const current_item =
      cartDataFromLocalStorage?.length > 0 &&
      cartDataFromLocalStorage?.find(
        (cart) => cart?.item?.id === data?.saddleData?.id
      );
    if (current_item) {
      if (current_item?.hasSaddleFitReport) {
        setIsSaddleFitReportChecked(true);
        setSaddleFitReportPrice();
      }
    }
  }, []);
  return (
    <>
      <div className="w-[100%] sm:w-[90%] lg:w-[100%]  px-5 flex pt-5 sm:pt-0 justify-center items-start sm:items-center gap-[13px] border-[#999] border rounded-[10px] h-auto">
        <img
          src={data?.saddleData?.photo}
          alt="saddle1"
          className="w-[140px] sm:w-[173px] h-[140px] sm:h-[172px]"
        />
        <div className="w-[60%] sm:w-[70%]  pr-5 sm:pr-0 flex flex-col h-auto pb-5 sm:py-5">
          <div className="flex w-full  flex-wrap justify-between item-start sm:items-center">
            <p className="cartpage-text" title={data?.saddleData?.title}>
              {data?.saddleData?.title}
            </p>
            <p className="cartpage-price">
              $
              {data?.saddleData?.price
                ?.toFixed(2)
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-[500px] flex justify-between items-center mt-[12px]">
              <p className="stock">In stock</p>
              {data?.hasSaddleFitReport && (
                <p className="saddleFit-report">Add-On: SaddleFit Report</p>
              )}
            </div>
          </div>
          <div className="w-[200px] sm:w-[300px]">
            <Gauge score={data?.saddleData?.score} />
          </div>

          <div className="flex mt-7  flex-wrap justify-between items-center">
            <div>
              <input
                type="checkbox"
                className="dashboard-checkbox sm:block hidden"
                checked={isChecked}
                onChange={(e) => checkboxHandler(e, data)}
              />
            </div>
            <div className="flex justify-between  items-center w-[220px]">
              <div></div>
              {loading ? (
                <Loader filledColor="#2b364b" />
              ) : (
                <p
                  className="remove cursor-pointer"
                  onClick={() => {
                    handleRemove(data?.saddleData?.id);
                  }}
                >
                  Remove
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
