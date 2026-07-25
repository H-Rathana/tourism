import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Clock3,
  DollarSign,
  ArrowRight,
  CalendarDays,
  Users,
  CircleCheck,
} from "lucide-react";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const percentage =
    tour.max_people > 0
      ? (tour.remaining_seats / tour.max_people) * 100
      : 0;
  
  const remainingPercentage =
  (Number(tour.remaining_seats) / Number(tour.max_people)) * 100;

    let seatColor = "";
    let seatBg = "";
    let seatText = "";

    if (remainingPercentage > 70) {
      seatColor = "bg-emerald-500";
      seatBg = "text-emerald-600";
      seatText = "Plenty Available";
    }
    else if (remainingPercentage > 30) {
      seatColor = "bg-yellow-500";
      seatBg = "text-yellow-600";
      seatText = "Filling Fast";
    }
    else {
      seatColor = "bg-red-500";
      seatBg = "text-red-600";
      seatText = "Almost Full";
    }

  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      group
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={`${BASE_URL}/uploads/${tour.image}`}
          alt={tour.title}
          onClick={() => navigate(`/tours/${tour.tour_id}`)}
          className="
          w-full
          h-72
          object-cover
          cursor-pointer
          group-hover:scale-110
          transition-transform
          duration-700
          "
        />

        {/* Status Badge */}
        <div
          className="
          absolute
          top-4
          left-4
          bg-emerald-500
          text-white
          px-4
          py-2
          rounded-full
          flex
          items-center
          gap-2
          shadow-lg
          text-sm
          font-semibold
          "
        >
          <CircleCheck size={16} />
          Available
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* Title */}
        <h2
          className="
          text-2xl
          font-bold
          text-slate-900
          line-clamp-1
          "
        >
          {tour.title}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-500 mt-2">

          <MapPin size={17} />

          <span>{tour.location}</span>

        </div>

        {/* Description
        <p
          className="
          text-slate-500
          mt-4
          line-clamp-3
          min-h-[72px]
          "
        >
          {tour.description}
        </p> */}

        {/* TOUR INFO */}
        <div className="mt-5 space-y-3">

          {/* Schedule */}
          <div className="flex items-center gap-3 text-slate-600">

            <CalendarDays
              size={18}
              className="text-sky-600"
            />

            <span>

              {formatDate(tour.available_from)} -{" "}

              {formatDate(tour.available_until)}

            </span>

          </div>

          {/* Duration */}
          <div className="flex items-center gap-3 text-slate-600">

            <Clock3
              size={18}
              className="text-orange-500"
            />

            <span>{tour.duration}</span>

          </div>

          {/* Seats */}
          <div className="flex items-center justify-between">

  <div className="flex items-center gap-3">

    <Users
      size={18}
      className={seatBg}
    />

    <span className="font-medium">

      {tour.remaining_seats} / {tour.max_people}

      {" "}Seats Remaining

    </span>

  </div>

  <span
  className={`
    px-2.5
    py-1
    rounded-full
    text-xs
    font-semibold
    whitespace-nowrap
    ${
      remainingPercentage > 70
        ? "bg-emerald-100 text-emerald-700"
        : remainingPercentage > 30
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }
  `}
>
  {remainingPercentage > 70
    ? "Available"
    : remainingPercentage > 30
    ? "Limited"
    : "Almost Full"}
</span>

        </div>       

          <div>

            <div
              className="
              w-full
              h-2
              bg-slate-200
              rounded-full
              overflow-hidden
              "
            >
              <div
                className={`
                    h-full
                    ${seatColor}
                    rounded-full
                    transition-all
                    duration-700
                  `}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
                mt-7
                pt-5
                border-t

                flex
                flex-col
                gap-5

                sm:flex-row
                sm:justify-between
                sm:items-center
              "
        >

          {/* Price */}

          <div>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Starting From
            </p>

            <div
              className="
              flex
              items-center
              gap-1
              "
            >
              <DollarSign
                size={20}
                className="text-emerald-600"
              />

              <span
                className="
                text-3xl
                font-bold
                text-slate-900
                "
              >
                {tour.price}
              </span>

            </div>

            <p className="text-sm text-slate-500">

              Per Person

            </p>

          </div>

          {/* Button */}

          <button
            onClick={() =>
              navigate(`/tours/${tour.tour_id}`)
            }
            className="
                w-full
                sm:w-auto
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-6
                py-3
                rounded-xl
                flex
                justify-center
                items-center
                gap-2
                font-semibold
                shadow-md
                transition
                cursor-pointer
                "
          >

            View Details

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </div>
  );
};

export default TourCard;