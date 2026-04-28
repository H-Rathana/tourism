import HeroSlider from "../components/HeroSlider";
import { useEffect, useState } from "react";
import TourList from "../components/TourList";


const Home = () => {
   const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <HeroSlider/>
         <TourList tours={tours} />
      
    </div>
  );
};

export default Home;