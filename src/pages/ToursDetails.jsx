import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import API, { BASE_URL } from "../services/api";

import TourDetailsSkeleton from "../components/TourDetailsSkeleton";
import BookingForm from "../components/BookingForm";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";

import {
  Mountain,
  UserRound,
  Camera,
  Bus,
  Check,
  Heart,
} from "lucide-react";

const TourDetails = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [tour, setTour] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const { user } =
    useContext(AuthContext);

  useEffect(() => {

    API.get(`/tours/${id}`)
      .then((res) => {

        setTour(res.data);

        setTimeout(
          () => setLoading(false),
          500
        );

      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);

  useEffect(() => {

    document.body.style.overflow =
      showModal
        ? "hidden"
        : "auto";

  }, [showModal]);
  const handleWishlist = async () => {

  if (!user) {

    navigate("/login");

    return;

  }

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await API.post(
      "/wishlist",
      {
        tour_id: tour.tour_id,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  toast.success(
  "Added to wishlist ❤️"
   );
   window.dispatchEvent(
  new Event("wishlistUpdated")
);
  } catch (error) {

    console.log(error);

    alert(
      "Already in wishlist"
    );

  }

};

  if (loading)
    return (
      <TourDetailsSkeleton />
    );

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
          mb-6
          w-12
          h-12
          rounded-full
          bg-white
          shadow
          flex
          items-center
          justify-center
          hover:bg-slate-100
          "
        >
          <FaChevronLeft />
        </button>

        {/* HERO */}

        <div
          className="
          relative
          h-[350px]
          md:h-[550px]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          "
        >

          <img
            src={`${BASE_URL}/uploads/${tour.image}`}
            alt={tour.title}
            className="
            w-full
            h-full
            object-cover
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
            "
          />

          <div
            className="
            absolute
            bottom-8
            left-8
            text-white
            "
          >

            <h1
              className="
              text-4xl
              md:text-6xl
              font-bold
              "
            >
              {tour.title}
            </h1>

            <div
              className="
              flex
              flex-wrap
              gap-5
              mt-4
              "
            >

              <span className="flex items-center gap-2">
                <FaMapMarkerAlt />
                {tour.location}
              </span>

              <span className="flex items-center gap-2">
                <FaClock />
                {tour.duration} Days
              </span>

              <span className="flex items-center gap-2">
                <FaStar />
                4.9 Rating
              </span>

            </div>

          </div>

        </div>

        {/* QUICK STATS */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
          my-10
          "
        >

          <div className="bg-white rounded-2xl p-5 shadow text-center">
            <h3 className="text-3xl font-bold">
              20+
            </h3>
            <p className="text-slate-500">
              Travelers
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow text-center">
            <h3 className="text-3xl font-bold">
              4.9
            </h3>
            <p className="text-slate-500">
              Rating
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow text-center">
            <h3 className="text-xl font-bold">
              {tour.location}
            </h3>
            <p className="text-slate-500">
              Destination
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow text-center">
            <h3 className="text-3xl font-bold">
              {tour.duration}
            </h3>
            <p className="text-slate-500">
              Days
            </p>
          </div>

        </div>

        {/* CONTENT */}

        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="md:col-span-2 space-y-8">

            {/* OVERVIEW */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-4
                "
              >
                Tour Overview
              </h2>

              <p
                className="
                text-slate-600
                leading-8
                "
              >
                {tour.description}
              </p>

            </div>

            {/* HIGHLIGHTS */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
              >
                Tour Highlights
              </h2>

              <div
                className="
                grid
                md:grid-cols-2
                gap-4
                "
              >

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Mountain size={20} />
                  Beautiful Scenery
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <UserRound size={20} />
                  Professional Guide
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Camera size={20} />
                  Great Photo Spots
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                  <Bus size={20} />
                  Comfortable Transport
                </div>

              </div>

            </div>

            {/* INCLUDED */}

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-8
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
              >
                What's Included
              </h2>

              <div className="space-y-3">

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Professional Tour Guide
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Transportation
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Drinking Water
                </p>

                <p className="flex items-center gap-2">
                  <Check size={18} className="text-green-600" />
                  Entrance Fees
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT BOOKING CARD */}

          <div>

            <div
              className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              sticky
              top-24
              "
            >

              <p className="text-slate-500">
                Starting From
              </p>

              <h2
                className="
                text-5xl
                font-bold
                text-orange-500
                "
              >
                ${tour.price}
              </h2>

              <p className="text-slate-400 mt-2">
                per person
              </p>
              <div
                className="
                absolute
                top-6
                right-6
                z-20
                "
              >
        <button
          onClick={handleWishlist}
          className="
          w-14
          h-14
          rounded-full
          bg-white/90
          backdrop-blur
          shadow-lg
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          "
        >
          <Heart
            size={24}
            className="
            text-red-500
            "
          />
        </button>
      </div>
              <button
                onClick={() => {

                  if (!user) {

                    navigate(
                      "/login"
                    );

                  } else {

                    setShowModal(
                      true
                    );

                  }

                }}
                className="
                w-full
                mt-6
                bg-gradient-to-r
                from-orange-500
                to-yellow-400
                text-white
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                transition
                "
              >
                Book This Tour
              </button>

              <div
                className="
                mt-6
                text-sm
                text-slate-500
                space-y-2
                "
              >

                <p>
                  ✔ Free Cancellation
                </p>

                <p>
                  ✔ Instant Confirmation
                </p>

                <p>
                  ✔ Secure Booking
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {showModal && (

        <BookingForm
          tour={tour}
          onClose={() =>
            setShowModal(false)
          }
        />

      )}

    </div>

  );

};

export default TourDetails;

