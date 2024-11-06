import { HeroSection } from "./HeroSection";
import { FeatureCards } from "./FeatureCards";
import { EventCard } from "./EventCard";
import { Gallery } from "./Gallery";
import { FirstBanner } from "./FirstBanner";
import { SecondBanner } from "./SecondBanner";
import { Testimonials } from "./Testimonials";
// import { FeaturedBrands } from "./FeatureBrands";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <EventCard />
      <FirstBanner type="LANDING"/>
      <Testimonials />
      <SecondBanner type="LANDING"/>
      {/* <FeaturedBrands /> */}
    </>
  );
};

export default LandingPage;
