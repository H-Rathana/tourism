import { useEffect, useState } from "react";
import API from "../../services/api";
import TourList from "../TourList";

const FeaturedTours = () => {

  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {

      const res =
        await API.get("/tours");

      setTours(
        res.data.slice(0, 3)
      );

    } catch (error) {

      console.log(error);

    }
  };
  useEffect(() => {
        const loadFetchTours = async ()=>{
            fetchTours();
        }
        loadFetchTours();
  }, []);

  return (
    <section className="bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-start mb-10 ">
          Featured Tours
        </h2>

        <TourList tours={tours} />

      </div>

    </section>
  );
};

export default FeaturedTours;