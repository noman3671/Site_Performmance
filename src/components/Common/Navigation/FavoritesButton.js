import React from "react";
import Button from "components/Buttons";
import { HeartIcon } from "components/Icons";
import { useNavigate } from "react-router-dom";

export default ({ countLabel = 3, className }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/favorite")}
      transparent
      className={`${className}`}
      AppendIcon={<HeartIcon />}
    />
  );
};
