import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  Map,
  DollarSign,
} from "lucide-react";

import API, {BASE_URL,} from "../../services/api.js";

const PopularDestinations = () => {

  const navigate = useNavigate();

  const [destinations, setDestinations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchDestinations =
      async () => {

        try {

          const res =
            await API.get(
              "/tours/popular-destinations"
            );

          setDestinations(
            res.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchDestinations();

  }, []);

  // ===========================
  // LOADING
  // ===========================

  if (loading) {

    return (

      <section
        className="
        py-24
        bg-gradient-to-b
        from-white
        to-slate-100
        "
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12">

            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>

            <div className="h-12 w-80 bg-gray-200 rounded mt-4 animate-pulse"></div>

            <div className="h-5 w-96 bg-gray-200 rounded mt-4 animate-pulse"></div>

          </div>

          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-8
            "
          >

            {[1,2,3,4,5,6].map((item)=>(

              <div
                key={item}
                className="
                h-[430px]
                rounded-[28px]
                bg-gray-200
                animate-pulse
                "
              />

            ))}

          </div>

        </div>

      </section>

    );

  }

  // ===========================
  // UI
  // ===========================

  return (

    <section
      className="
      py-24
      bg-gradient-to-b
      from-white
      to-slate-100
      "
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="mb-14">

          <span
            className="
            uppercase
            tracking-[4px]
            text-orange-500
            font-semibold
            "
          >

            Explore Cambodia

          </span>

          <h2
            className="
            text-5xl
            font-black
            mt-3
            text-slate-900
            "
          >

            Popular Destinations

          </h2>

          <p
            className="
            text-lg
            text-slate-500
            mt-4
            max-w-2xl
            "
          >

            Discover Cambodia's most loved destinations,
            explore unique experiences,
            and begin your next unforgettable journey.

          </p>

        </div>

        {/* GRID */}

        <div
          className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
              "
        >

          {destinations.slice(0, 6).map((destination) => (

  <div
    key={destination.location}

    onClick={() =>
      navigate(
        `/tours?location=${encodeURIComponent(
          destination.location
        )}`
      )
    }

    className="
    relative
    group
    h-[260px]
    rounded-3xl
    overflow-hidden
    cursor-pointer
    shadow-lg
    hover:shadow-2xl
    transition-all
    duration-500
    hover:-translate-y-2
    "
  >

    {/* IMAGE */}

    <img
      src={`${BASE_URL}/uploads/${destination.image}`}
      alt={destination.location}
      className="
      w-full
      h-full
      object-cover
      group-hover:scale-110
      transition-transform
      duration-700
      "
    />

    {/* Overlay */}

    <div
      className="
      absolute
      inset-0
      bg-gradient-to-t
      from-black
      via-black/30
      to-transparent
      "
    />

    {/* Popular */}

    

    {/* Bottom */}

    <div
      className="
      absolute
      bottom-0
      left-0
      right-0
      p-7
      text-white
      "
    >


      <h2
        className="
        text-3xl
        font-black
        mt-2
        "
      >
        {destination.location}
      </h2>

      <div
        className="
        flex
        justify-between
        items-center
        mt-6
        "
      >

        <span
          className="
          bg-white/20
          backdrop-blur-md
          px-4
          py-2
          rounded-full
          text-sm
          "
        >

          {destination.total_tours} Tours

        </span>

        <span
          className="
          flex
          items-center
          gap-2
          font-semibold
          group-hover:text-orange-300
          transition
          "
        >

          Explore

          <span
            className="
            group-hover:translate-x-2
            transition-transform
            duration-300
            "
          >
            →
          </span>

        </span>

      </div>

    </div>

  </div>

))}

        </div>

      </div>

    </section>

  );

};

export default PopularDestinations;