import React from 'react'

import dashboard_bg_img from "assets/icons/dashboard/dashboard-saddle-bg.svg";
import dashboard_mob_bg_img from "assets/icons/dashboard/dashboard-mob-saddle-bg.svg";

const HorsesBackground = () => {
  return (
    <div>
    <img
      src={dashboard_bg_img}
      alt="bg-img"
      className="dashboard_bg_img"
    />
    <img
      src={dashboard_mob_bg_img}
      alt="bg-img"
      className="dashboard_mob_bg_img"
    />
  </div>
  )
}

export default HorsesBackground