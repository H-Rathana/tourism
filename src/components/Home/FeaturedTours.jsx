import { useEffect, useState } from "react";
import API from "../../services/api";
import PopularTourCard from "./PopularTourCard";

const FeaturedTours = () => {

  const [tours, setTours] = useState([]);

  useEffect(() => {

    const fetchPopularTours = async () => {

      try {

        const res =
          await API.get(
            "/tours/popular"
          );

        setTours(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchPopularTours();

  }, []);

  if (!tours.length) return null;

  const heroTour = tours[0];

  const sideTours =
    tours.slice(1, 3);

  return (

      <section className="bg-slate-50 py-20" data-aos="fade-up">

      <div className="max-w-7xl mx-auto px-6">

      <div className="mb-12">

      <p className="text-sky-600 font-semibold uppercase tracking-widest">

      Traveler Favorites

      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-2">

      Most Popular Tours

      </h2>

      <p className="text-slate-500 mt-4 max-w-2xl">

      Explore Cambodia's most booked destinations based on real traveler bookings and customer reviews.

      </p>

      </div>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-5
        gap-8
        items-start
      "
      >

        {/* Hero Tour */}
        <div className="lg:col-span-3" data-aos="fade-right">

          <PopularTourCard
            tour={heroTour}
            rank={1}
          />

        </div>

        {/* Side Tours */}
        <div className="lg:col-span-2 flex flex-col gap-6" data-aos="fade-left">

          {sideTours.map((tour, index) => (

            <PopularTourCard
              key={tour.tour_id}
              tour={tour}
              rank={index + 2}
            />

          ))}

        </div>

      </div>

      </div>

      </section>

  );

};

export default FeaturedTours;