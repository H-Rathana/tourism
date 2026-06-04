import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  Star,
  Plane,
} from "lucide-react";

import TourList from "../components/TourList";

const Tours = () => {

  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("http://localhost:5000/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.log(err));
  }, []);

  // Search
  let filteredTours = tours.filter((tour) =>
    tour.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sort
  if (sort === "low-high") {
    filteredTours.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredTours.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <section
        className="
        relative
        h-[350px]
        md:h-[450px]
        overflow-hidden
        "
      >
        <img
          src="https://media.bookmundi.com/aggregate-hero-images/cambodia/cropped.jpg?format=auto&quality=60&width=1920"
          alt=""
          className="
          w-full
          h-full
          object-cover
          "
        />

        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
          absolute
          inset-0
          flex
          flex-col
          justify-center
          items-center
          text-center
          text-white
          px-6
          "
        >
          <h1
            className="
            text-4xl
            md:text-6xl
            font-bold
            mb-4
            "
          >
            Explore Cambodia
          </h1>

          <p
            className="
            max-w-2xl
            text-lg
            text-slate-200
            "
          >
            Discover amazing destinations,
            hidden gems and unforgettable
            adventures with WanderEscape.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* SECTION TITLE */}
        <div className="mb-10">

          <h2
            className="
            text-4xl
            font-bold
            text-slate-900
            "
          >
            Explore Our Tours
          </h2>

          <p className="text-slate-500 mt-2">
            Choose from our carefully curated
            travel experiences across Cambodia.
          </p>

        </div>

        {/* STATS */}
        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
          mb-10
          "
        >

          <div
            className="
            bg-white
            p-5
            rounded-2xl
            shadow
            "
          >
            <Plane
              className="text-sky-500 mb-3"
            />
            <h3 className="text-2xl font-bold">
              {tours.length}
            </h3>
            <p className="text-slate-500">
              Tours
            </p>
          </div>

          <div
            className="
            bg-white
            p-5
            rounded-2xl
            shadow
            "
          >
            <MapPin
              className="text-orange-500 mb-3"
            />
            <h3 className="text-2xl font-bold">
              25+
            </h3>
            <p className="text-slate-500">
              Destinations
            </p>
          </div>

          <div
            className="
            bg-white
            p-5
            rounded-2xl
            shadow
            "
          >
            <Users
              className="text-green-500 mb-3"
            />
            <h3 className="text-2xl font-bold">
              500+
            </h3>
            <p className="text-slate-500">
              Travelers
            </p>
          </div>

          <div
            className="
            bg-white
            p-5
            rounded-2xl
            shadow
            "
          >
            <Star
              className="text-yellow-500 mb-3"
            />
            <h3 className="text-2xl font-bold">
              4.9
            </h3>
            <p className="text-slate-500">
              Rating
            </p>
          </div>

        </div>

        {/* SEARCH + SORT */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          justify-between
          mb-10
          "
        >

          <div className="relative">

            <Search
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
              pl-11
              pr-4
              py-3
              w-full
              md:w-96
              rounded-xl
              border
              bg-white
              "
            />

          </div>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
            px-4
            py-3
            rounded-xl
            border
            bg-white
            "
          >
            <option value="default">
              Sort By
            </option>

            <option value="low-high">
              Price Low → High
            </option>

            <option value="high-low">
              Price High → Low
            </option>

          </select>

        </div>

        {/* CATEGORY FILTERS */}
        <div
          className="
          flex
          gap-3
          flex-wrap
          mb-10
          "
        >
          <button className="px-5 py-2 rounded-full bg-sky-500 text-white">
            All
          </button>

          <button className="px-5 py-2 rounded-full bg-white border">
            Beach
          </button>

          <button className="px-5 py-2 rounded-full bg-white border">
            Adventure
          </button>

          <button className="px-5 py-2 rounded-full bg-white border">
            Culture
          </button>

          <button className="px-5 py-2 rounded-full bg-white border">
            Nature
          </button>
        </div>

        {/* TOUR LIST */}
        {filteredTours.length > 0 ? (

          <TourList tours={filteredTours} />

        ) : (

          <div
            className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow
            "
          >
            <h3 className="text-2xl font-bold">
              No Tours Found
            </h3>

            <p className="text-slate-500 mt-2">
              Try another search keyword.
            </p>
          </div>

        )}

        {/* CTA */}
        <div
          className="
          mt-20
          bg-sky-600
          rounded-3xl
          p-10
          text-center
          text-white
          "
        >
          <h2 className="text-3xl font-bold">
            Ready For Your Next Adventure?
          </h2>

          <p className="mt-3 text-sky-100">
            Discover unforgettable travel
            experiences with WanderEscape.
          </p>

          <button
            className="
            mt-6
            bg-white
            text-sky-600
            px-8
            py-3
            rounded-xl
            font-semibold
            "
          >
            Contact Us
          </button>
        </div>

      </div>

    </div>
  );
};

export default Tours;