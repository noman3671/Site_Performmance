import React from "react";
import Button from "components/Buttons";
import { ShopCartIcon } from "components/Icons";
import { useNavigate } from "react-router-dom";

export default ({ countLabel = "1", className }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/cart")}
      transparent
      className={`${className}`}
      AppendIcon={<ShopCartIcon />}
    />
  );
};
