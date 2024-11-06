import { HorseCards } from "./HorseProfile/HorseCards";
import HorsesBackground from "./HorsesBackground";
import { Header } from "./Header"
import "./style.css";

export const MyHorses = () => {
  return (
    <div className="mb-10">
      <div className="w-full dashboard_wrapper">
        <div className="dashboard_main">
          <Header />
          <div className="horse_profile_card_main">
            <HorseCards />
          </div>
        </div>
        <HorsesBackground />
      </div>
    </div>
  );
};