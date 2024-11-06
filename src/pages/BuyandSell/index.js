import React, { useState, useEffect } from "react";
import stars_image from "assets/icons/star_img.svg";
import { FormInput } from "components/Inputs";
import SaddleTable from "./SaddleTable";
import { gql, useQuery } from "@apollo/client";
import { GET_USER_TRANSACTIONS } from "apollo/queries/userTransactions";
import "./style.css";
import { Loader } from "@aws-amplify/ui-react";

const BuyandSell = () => {
  const { data, loading, refetch } = useQuery(gql(GET_USER_TRANSACTIONS), {
    fetchPolicy: "network-only",
  });
  const [selected, setSelected] = useState([{ value: "All", label: "All" }]);
  const [filteredData, setFilteredData] = useState({
    boughtSaddles: [],
    soldSaddles: [],
  });

  const buysellOptions = [
    { value: "All", label: "All" },
    { value: "Sold", label: "Sold" },
    { value: "Purchased", label: "Purchased" },
  ];

  const buySellFilterHandler = (value) => {
    const newSelection = buysellOptions.find(
      (option) => option.value === value?.value
    ) || { value: "All", label: "All" };
    setSelected([newSelection]);
  };

  useEffect(() => {
    if (!data) return;
    const { boughtSaddles, soldSaddles } = data.getUserTransactions;

    // Sort by date
    const sortByDate = (a, b) => new Date(b.createdAt * 1000) - new Date(a.createdAt * 1000) ;

    const sortedBoughtSaddles = [...boughtSaddles].sort(sortByDate);
    const sortedSoldSaddles = [...soldSaddles].sort(sortByDate);

    switch (selected[0].value) {
      case "Sold":
        refetch();
        setFilteredData({ boughtSaddles: [], soldSaddles: sortedSoldSaddles });
        break;
      case "Purchased":
        refetch();
        setFilteredData({ boughtSaddles: sortedBoughtSaddles, soldSaddles: [] });
        break;
      default:
        refetch();
        setFilteredData({ boughtSaddles: sortedBoughtSaddles, soldSaddles: sortedSoldSaddles });
        break;
    }
  }, [selected, data, refetch]);

  return (
    <div className="w-[90%] mx-auto mb-[63px]">
      <div className="w-[90%] 2xl:max-w-[1418px] flex flex-col justify-between mx-auto mt-[121px]">
        <div>
          <h1 className="buy_and_sell_title">Orders</h1>
          <p className="buy_and_sell_subtitle">
            Track your orders and see your transaction history
          </p>
          <img src={stars_image} alt="stars" />
        </div>
        <div className="mt-[62px]">
          <FormInput
            className="saddle-profile-form__field"
            label="Filter"
            type="select2"
            height="56px"
            placeholder="Select filter"
            selectedValues={selected}
            options={buysellOptions}
            onChange={buySellFilterHandler}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader
            filledColor="#2b364b"
            className="!h-[60px] !flex !items-center !text-center !justify-center"
          />
        </div>
      ) : (
        <SaddleTable
          boughtSaddles={filteredData.boughtSaddles}
          soldSaddles={filteredData.soldSaddles}
        />
      )}
    </div>
  );
};

export default BuyandSell;
