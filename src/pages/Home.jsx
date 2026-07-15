import HeroSlider from "../components/HeroSlider";
import TourList from "../components/TourList";
import PopularDestinations from "../components/Home/PopularDestinations";
import FeaturedTours from "../components/Home/FeaturedTours";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import CtaSection from "../components/Home/CTASection";

const Home = () => {
   

  return (
    <div>
      <HeroSlider/>
      <PopularDestinations/> 
      <FeaturedTours/>
      <WhyChooseUs/>
      <CtaSection/>

    </div>
  );
};

export default Home;