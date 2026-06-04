import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Clock3,
  DollarSign,
  ArrowRight,
  Star,
} from "lucide-react";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

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
      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          onClick={() =>
            navigate(`/tours/${tour.tour_id}`)
          }
          src={`${BASE_URL}/uploads/${tour.image}`}
          alt={tour.title}
          className="
          w-full
          h-72
          md:h-80
          object-cover
          cursor-pointer
          group-hover:scale-110
          transition-transform
          duration-700
          "
        />

        {/* Tour Badge
        <div
          className="
          absolute
          bottom-4
          left-4
          bg-orange-500
          text-white
          px-3
          py-1
          rounded-full
          text-sm
          font-medium
          shadow
          "
        >
          🔥 Popular
        </div> */}

        {/* Rating
        <div
          className="
          absolute
          top-4
          right-4
          bg-white
          px-3
          py-1
          rounded-full
          shadow-md
          flex
          items-center
          gap-1
          "
        >
          <Star
            size={14}
            className="text-yellow-500 fill-yellow-500"
          />
          <span className="text-sm font-semibold">
            4.9
          </span>
        </div> */}

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Location + Duration */}
        <div
          className="
          flex
          justify-between
          items-center
          text-sm
          text-slate-500
          mb-4
          "
        >
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{tour.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock3 size={16} />
            <span>{tour.duration} Days</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="
          text-2xl
          font-bold
          text-slate-900
          mb-3
          line-clamp-1
          "
        >
          {tour.title}
        </h2>

        {/* Description */}
        <p
          className="
          text-slate-500
          text-base
          line-clamp-3
          min-h-[72px]
          "
        >
          {tour.description}
        </p>

        {/* Footer */}
        <div
          className="
          flex
          items-center
          justify-between
          mt-6
          pt-5
          border-t
          border-slate-100
          "
        >

          {/* Price */}
          <div>

            <div className="flex items-center gap-1">

              <DollarSign
                size={20}
                className="text-emerald-500"
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

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              per person
            </p>

          </div>

          {/* Button */}
          <button
            onClick={() =>
              navigate(`/tours/${tour.tour_id}`)
            }
            className="
            flex
            items-center
            gap-2
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            shadow-md
            "
          >
            Book Now
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default TourCard;