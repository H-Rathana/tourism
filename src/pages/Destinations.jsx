import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../services/api";
import {
  MapPin,
  Search,
  ArrowRight,
  Map,
  Package,
  DollarSign,
} from "lucide-react";
import pic from "../assets/destinations/pic.png";
const Destinations = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await API.get("/tours/destinations");
        setDestinations(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((item) =>
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalTours = destinations.reduce(
    (sum, item) => sum + Number(item.total_tours),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HERO ================= */}

      <section className="relative h-[520px] overflow-hidden">

  <img
    src={pic}
    alt="Cambodia"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-fill
    "
  />

  {/* Overlay */}

  <div
    className="
      absolute
      inset-0
      bg-black/45
    "
  />

  {/* Content */}

  <div
    className="
      relative
      z-10
      max-w-7xl
      mx-auto
      h-full
      px-6

      flex
      flex-col
      justify-center
    "
  >

    <p className="uppercase tracking-[5px] text-orange-300 font-semibold">

      Explore Cambodia

    </p>

    <h1
      className="
      text-6xl
      font-black
      text-white
      mt-4
      "
    >

      Destinations

    </h1>

    <p
      className="
      text-white/90
      text-xl
      mt-6
      max-w-2xl
      leading-9
      "
    >

      Discover Cambodia's breathtaking beaches,
      ancient temples, majestic mountains,
      and unforgettable cultural experiences.

    </p>

    <button
      onClick={() => navigate("/tours")}
      className="
      mt-10
      w-fit

      bg-orange-500
      hover:bg-orange-600

      px-8
      py-4

      rounded-2xl

      font-semibold
      text-white

      transition
      "
    >

      Explore Tours →

    </button>

  </div>

</section>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ================= STATS ================= */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  Destinations
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {destinations.length}
                </h2>

              </div>

              <Map
                className="text-sky-500"
                size={34}
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  Tours
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {totalTours}
                </h2>

              </div>

              <Package
                className="text-orange-500"
                size={34}
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex justify-between">

              <div>

                <p className="text-slate-500">
                  Starting From
                </p>

                <h2 className="text-4xl font-black mt-2">
                  $
                  {destinations.length
                    ? Math.min(
                        ...destinations.map((d) =>
                          Number(d.starting_price)
                        )
                      )
                    : 0}
                </h2>

              </div>

              <DollarSign
                className="text-emerald-500"
                size={34}
              />

            </div>

          </div>

        </div>

        {/* ================= SEARCH ================= */}

        <div className="relative mb-10 max-w-md">

          <Search
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-white
              rounded-2xl
              border
              pl-12
              pr-5
              py-4
              shadow-sm
              outline-none
              focus:ring-2
              focus:ring-sky-500
            "
          />

        </div>

        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="text-center py-24">

            Loading destinations...

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {filteredDestinations.map((destination) => (

              <div
                key={destination.location}
                className="
                  group
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                {/* IMAGE */}

                <div className="relative h-72 overflow-hidden">

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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-5 left-5">


                  </div>

                  <div className="absolute bottom-5 left-5 text-white">

                    <div className="flex items-center gap-2">

                      <MapPin size={18} />

                      <span className="text-sm uppercase tracking-widest">
                        Cambodia
                      </span>

                    </div>

                    <h2 className="text-4xl font-black mt-2">
                      {destination.location}
                    </h2>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">



                  <div className="flex justify-between items-center mt-6">

                    <div>

                      <p className="text-sm text-slate-400">
                        Starting From
                      </p>

                      <h2 className="text-3xl font-black text-orange-500">
                        ${destination.starting_price}
                      </h2>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/tours?location=${encodeURIComponent(
                            destination.location
                          )}`
                        )
                      }
                      className="
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        flex
                        items-center
                        gap-2
                        font-semibold
                        transition
                      "
                    >

                      Explore

                      <ArrowRight size={18} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {!loading &&
          filteredDestinations.length === 0 && (

            <div className="bg-white rounded-3xl p-16 text-center mt-12 shadow-sm">

              <h2 className="text-3xl font-bold">
                No Destinations Found
              </h2>

              <p className="text-slate-500 mt-3">
                Try searching with another destination.
              </p>

            </div>

          )}

      </div>

    </div>
  );
};

export default Destinations;