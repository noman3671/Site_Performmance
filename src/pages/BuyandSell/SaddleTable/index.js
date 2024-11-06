import React from "react";
import Button from "components/Buttons";

const SaddleTable = ({ boughtSaddles, soldSaddles }) => {
  const renderSaddleRow = (saddle, status) => (
    <tr
      key={saddle.id}
      className="h-auto w-full flex justify-between items-center lg:flex-row table_body"
    >
      <td className="w-[120px] h-full px-3">
        {new Date(saddle.createdAt * 1000).toLocaleDateString()}
      </td>
      <td className="w-[400px] px-3">{saddle?.saddle?.title}</td>
      <td className="w-[190px] px-3">
        {saddle?.status.split('_').join(' ')}
      </td>
      <td className="w-[300px] px-3">
        {saddle?.shippingDetails?.trackingNumber}
      </td>
      <td className="w-[190px] px-3">{saddle?.shippingDetails?.status.split("_").join(" ")}</td>
      <td className="w-[250px] py-5">
        <Button
          disabled={saddle.status === "PAYMENT_WAITING" ? true : false}
          onClick={() => {
            window?.open(status === "Sold" ? saddle?.receiptUrl : saddle?.shippingDetails?.trackingUrlProvider, "_blank");
          }}
          className={`load_more_btn_buy_sell_tbody !w-[180px] text-[14px]  ${saddle.status === "PAYMENT_WAITING" && "bg-[#D7D7D7] pointer-events-none"} bg-[#2B364B]`}
        >
          {status === "Sold" ? "Payment Invoice" : "Track Package"}
        </Button>
        {/* <Button className="viewEdit_buy_sell_tbody my-[16px] !w-[180px] bg-[#2B364B]">
          View Order
        </Button>
        <Button className="load_more_btn_buy_sell_tbody text-[14px] !w-[180px] bg-[#ADBFDB] !text-[#2B364B]">
          {status === "Sold" ? "Review" : "Write a Review"}
        </Button> */}
      </td>
    </tr>
  );

  if (!boughtSaddles.length && !soldSaddles.length) {
    return (
      <div className="w-[90%] 2xl:max-w-[1418px] mx-auto h-auto mt-[78px] text-center">
        <p className="buy_and_sell_subtitle">No saddles found.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] 2xl:max-w-[1418px] mx-auto min-h-[500px] mt-[78px] no-scrollbar overflow-x-auto">
      <table className="w-full mx-auto 2xl:w-full border border-solid min-w-[1024px]">
        <thead>
          <tr className="h-auto w-full bg-[#F7F7F6] py-5 flex items-center lg:flex-row table_head">
            <th className="w-[120px] text-start px-3">Date</th>
            <th className="w-[400px] text-start px-3">Title</th>
            <th className="w-[190px] text-start px-3">Status</th>
            <th className="w-[300px] text-start px-3">Tracking Number</th>
            <th className="w-[190px] text-start px-3">Tracking</th>
            <th className="w-[250px] text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {boughtSaddles.map((saddle) => renderSaddleRow(saddle, "Purchased"))}
          {soldSaddles.map((saddle) => renderSaddleRow(saddle, "Sold"))}
        </tbody>
      </table>
    </div>
  );
};

export default SaddleTable;