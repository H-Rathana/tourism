import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams
} from "react-router-dom";

import {
  Search,
  MapPin,
  Users,
  Star,
  Plane,
  TrendingUp,
} from "lucide-react";
import TourList from "../components/TourList";
import { useNavigate } from "react-router-dom";
import AnimationCounter from "../components/AnimatedCounter";
const Tours = () => {

  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const navigate = useNavigate();
  const [searchParams] =
  useSearchParams();

  const locationFilter =
  searchParams.get(
    "location"
  );
  const [stats, setStats] = useState({

    totalTours:0,
    destinations:0,
    travelers:0,
    averageRating:0

});
const fetchStats = async()=>{

    try{

        const res =
            await fetch(
                "http://localhost:5000/api/tours/stats"
            );

        const data =
            await res.json();

        setStats(data);

    }catch(err){

        console.log(err);

    }

};

  useEffect(() => {
    fetch("http://localhost:5000/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.log(err));

      fetchStats();
  }, []);

  // Search
 let filteredTours =
  tours.filter((tour) => {

    const matchSearch =

      tour.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      tour.location
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchLocation =

      !locationFilter ||

      tour.location ===
      locationFilter;

    return (
      matchSearch &&
      matchLocation
    );

  });

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
        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-12
          "
          >

          {/* Tours */}

          <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          hover:shadow-xl
          transition
          p-6
          group
          "
          >

          <div className="flex justify-between items-start">

          <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-sky-100
          flex
          items-center
          justify-center
          group-hover:scale-110
          transition
          "
          >

          <Plane
          size={28}
          className="text-sky-600"
          />

          </div>

          <TrendingUp
          size={18}
          className="text-green-500"
          />

          </div>

          <p className="text-slate-500 mt-6">
          Available Tours
          </p>

          <h2 className="text-4xl font-bold mt-2">

          <AnimationCounter
            end={stats.totalTours}
          />

          </h2>

          <p className="text-sm text-green-600 mt-3">
          Explore Cambodia
          </p>

          </div>

          {/* Destinations */}

          <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          hover:shadow-xl
          transition
          p-6
          group
          "
          >

          <div className="flex justify-between items-start">

          <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-orange-100
          flex
          items-center
          justify-center
          group-hover:scale-110
          transition
          "
          >

          <MapPin
          size={28}
          className="text-orange-500"
          />

          </div>

          <TrendingUp
          size={18}
          className="text-green-500"
          />

          </div>

          <p className="text-slate-500 mt-6">
          Destinations
          </p>

          <h2 className="text-4xl font-bold mt-2">

          <AnimationCounter end={stats.destinations} />

          </h2>

          <p className="text-sm text-orange-500 mt-3">
          Across Cambodia
          </p>

          </div>

          {/* Travelers */}

          <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          hover:shadow-xl
          transition
          p-6
          group
          "
          >

          <div className="flex justify-between items-start">

          <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-green-100
          flex
          items-center
          justify-center
          group-hover:scale-110
          transition
          "
          >

          <Users
          size={28}
          className="text-green-600"
          />

          </div>

          <TrendingUp
          size={18}
          className="text-green-500"
          />

          </div>

          <p className="text-slate-500 mt-6">
          Happy Travelers
          </p>

          <h2 className="text-4xl font-bold mt-2">

          <AnimationCounter end={stats.travelers} />
          
          </h2>

          <p className="text-sm text-green-600 mt-3">
          Completed Bookings
          </p>

          </div>

          {/* Rating */}

          <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          hover:shadow-xl
          transition
          p-6
          group
          "
          >

          <div className="flex justify-between items-start">

          <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-yellow-100
          flex
          items-center
          justify-center
          group-hover:scale-110
          transition
          "
          >

          <Star
          size={28}
          className="text-yellow-500"
          />

          </div>

          <TrendingUp
          size={18}
          className="text-green-500"
          />

          </div>

          <p className="text-slate-500 mt-6">
          Average Rating
          </p>

          <h2 className="text-4xl font-bold mt-2">

          <AnimationCounter
              end={stats.averageRating}
              decimals={1}
            />

          </h2>

          <p className="text-sm text-yellow-500 mt-3">
          Verified Reviews
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

            {
              locationFilter && (

                <div
                  className="
                  mb-6
                  bg-orange-100
                  text-orange-700
                  px-5
                  py-3
                  rounded-2xl
                  "
                >

                  Showing tours in:
                  <strong>
                    {" "}
                    {locationFilter}
                  </strong>

                </div>

              )
            }
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
          onClick={() =>
                navigate("/contact-us")
              }
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