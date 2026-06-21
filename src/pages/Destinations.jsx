import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import kampotImg from "../assets/destinations/kampot.jpg";
import kepImg from "../assets/destinations/kep.jpg";
import siemReapImg from "../assets/destinations/siemreap.jpg";
import mondulkiriImg from "../assets/destinations/mondulkiri.jpg";
import steungTrengImg from "../assets/destinations/steungTreng.jpg";
import kratieImg from "../assets/destinations/kratie.jpg";
import kampongchamImg from "../assets/destinations/kampongcham.jpg";
import sihanukvllImg from "../assets/destinations/sihanukvll.jpg";
import battdombongImg from "../assets/destinations/battdombong.jpg";
const Destinations = () => {

  const [tours, setTours] =
    useState([]);

  const [search, setSearch] =
    useState("");
  
  const navigate = useNavigate();

   const destinationImages = {

  Kampot: kampotImg,

  Kep: kepImg,

  "Seim Reap": siemReapImg,

  "Mondul Kiri": mondulkiriImg,

  "Steung Treang Province":steungTrengImg,

  "Kampong Cham":kampongchamImg,

  ShihanukVilla: sihanukvllImg,

  Kratie:kratieImg,
  
  "Battdombong Province":battdombongImg,

};

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/tours"
    )
      .then((res) => res.json())
      .then((data) =>
        setTours(data)
      )
      .catch((err) =>
        console.log(err)
      );

  }, []);

  // Unique destinations
  const destinations = [

    ...new Set(
      tours.map(
        (tour) => tour.location
      )
    ),

  ];

  // Search filter
  const filteredDestinations =
    destinations.filter(
      (destination) =>
        destination
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // Count tours per destination
  const getTourCount = (
    location
  ) => {

    return tours.filter(
      (tour) =>
        tour.location ===
        location
    ).length;

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-10">

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            "
          >
            Explore Destinations
          </h1>

          <p
            className="
            text-slate-500
            mt-2
            "
          >
            Discover Cambodia's
            most beautiful places.
          </p>

        </div>

        {/* Statistics */}
        <div
          className="
          grid
          md:grid-cols-2
          gap-5
          mb-10
          "
        >

          <div
            className="
            bg-white
            p-6
            rounded-3xl
            shadow
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              "
            >
              {destinations.length}
            </h2>

            <p className="text-gray-500">
              Destinations
            </p>

          </div>

          <div
            className="
            bg-white
            p-6
            rounded-3xl
            shadow
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              "
            >
              {tours.length}
            </h2>

            <p className="text-gray-500">
              Available Tours
            </p>

          </div>

        </div>

        {/* Search */}
        <div className="mb-10">

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            md:w-96
            px-5
            py-3
            rounded-2xl
            border
            bg-white
            shadow-sm
            "
          />

        </div>

        {/* Destination Cards */}
        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >

          {filteredDestinations.map(
            (
              destination
            ) => (

              <div
                key={destination}
                className="
                bg-white
                    rounded-3xl
                    shadow-md
                    overflow-hidden
                    cursor-pointer
                    group
                    transform
                    transition-all
                    duration-500

                    hover:-translate-y-3
                    hover:shadow-2xl

                "
              >

                {/* Image Placeholder */}
               <div className="relative">

                    <img
                        src={destinationImages[destination]}
                        alt={destination}
                        className="
                        h-56
                        w-full
                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-110
                        "
                        />

                    <div
                        className="
                        absolute
                        inset-0
                        bg-black/30
                        "
                    />

                    <div
                        className="
                        absolute
                        bottom-4
                        left-4
                        text-white
                        "
                    >

                        <h2
                        className="
                        text-2xl
                        font-bold
                        "
                        >
                        {destination}
                        </h2>

                    </div>

                    </div>

                {/* Content */}
                <div className="p-6">

                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                    >
                    {destination}
                  </h2>
                    <p
                    className="
                    text-gray-500
                    mt-2

                    transition-all
                    duration-300

                    group-hover:text-gray-700
                    "
                    >
                    Discover amazing
                    tours in{" "}
                    {destination}
                  </p>

                  <p
                    className="
                    text-orange-500
                    font-semibold
                    mt-3
                    "
                  >
                    {getTourCount(
                      destination
                    )}{" "}
                    Tours Available
                  </p>

                  <button
                    onClick={() =>
                        navigate(
                        `/tours?location=${destination}`
                        )
                    }
                    className="
                     mt-5
                        px-4
                        py-2

                        bg-gradient-to-r
                        from-orange-500
                        to-yellow-400

                        text-white
                        rounded-xl

                        opacity-0
                        translate-y-4

                        transition-all
                        duration-500

                        group-hover:opacity-100
                        group-hover:translate-y-0
                    "
                    >
                    Explore Tours →
                    </button>

                </div>

              </div>

            )
          )}

        </div>

        {/* No Results */}
        {filteredDestinations.length ===
          0 && (

          <div
            className="
            bg-white
            rounded-3xl
            p-10
            mt-10
            text-center
            shadow
            "
          >

            <h3
              className="
              text-2xl
              font-bold
              "
            >
              No Destinations Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search
              keyword.
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default Destinations;