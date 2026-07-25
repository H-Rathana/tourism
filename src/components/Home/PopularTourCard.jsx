import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  Star,
  Flame,
} from "lucide-react";

const rankBadge = (rank) => {

  switch(rank){

    case 1:

      return{

        label:"🥇 #1 Most Popular",

        color:"bg-yellow-500"

      };

    case 2:

      return{

        label:"🥈 #2 Most Popular",

        color:"bg-gray-400"

      };

    case 3:

      return{

        label:"🥉 #3 Most Popular",

        color:"bg-orange-500"

      };

  }

};

const PopularTourCard = ({

tour,

rank

})=>{

if(!tour) return null;

const badge = rankBadge(rank);

const isHero =
rank===1;

return(

        <div
            className="
            group
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-500
            hover:-translate-y-2
            "
        >

            {/* IMAGE */}

            <div
            className={`
            relative
            overflow-hidden

           ${isHero
            ? "h-[280px]"
            : "h-44"}
            `}
            >

            <img

            src={`http://localhost:5000/uploads/${tour.image}`}

            alt={tour.title}
            
            className="
            w-full
            h-full
            object-cover
            group-hover:scale-110
            transition-transform
            duration-700
            "

            />

            <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
            "
            />

            <div
            className={`
            absolute
            top-5
            left-5

            ${badge.color}

            text-white

            px-4
            py-2

            rounded-full

            font-semibold

            shadow-lg
            `}
            >

            {badge.label}

            </div>

            </div>

            {/* CONTENT */}

            <div className="p-6">

            <h2
            className={`
            font-bold
            text-slate-800
            group-hover:text-sky-600
            transition

            ${isHero
                ? "text-3xl lg:text-4xl"
                : "text-xl"}
            `}
            >

            {tour.title}

            </h2>

            <div
            className="
            flex
            flex-wrap
            items-center
            gap-5

            text-slate-500

            mt-4
            mb-5

            text-sm
            "
            >

            <div className="flex items-center gap-2">

            <MapPin
            size={18}
            className="text-sky-500"
            />

            <span>

            {tour.location}

            </span>

            </div>

            <div className="flex items-center gap-2">

            <Flame
            size={18}
            className="text-orange-500"
            />

            <span>

            {tour.bookings} Bookings

            </span>

            </div>

            <div className="flex items-center gap-2">

            <Star
            size={18}
            fill="#FACC15"
            stroke="#FACC15"
            />

            <span>

            {tour.rating || "New"}

            {tour.total_reviews
            ?` (${tour.total_reviews})`
            :""}

            </span>

            </div>

            </div>

            <p
                className={`
                text-slate-600
                leading-7

                ${
                    isHero
                    ? "line-clamp-3 min-h-[78px]"
                    : "line-clamp-2"
                }
                `}
                >
                {tour.description}
            </p>

           <div
                className="
                flex
                justify-between
                items-center
                mt-6
                "
                >

            <div>

            <p
            className="
            uppercase
            tracking-widest
            text-xs
            text-slate-400
            "
            >

            Starting From

            </p>

           <h2
                className={`
                font-bold
                text-orange-500

                ${isHero ? "text-4xl" : "text-2xl"}
                `}
                >

            ${tour.price}

            </h2>

            <p className="text-sm text-slate-400">

            per person

            </p>

            </div>

            <Link

            to={`/tours/${tour.tour_id}`}

            className="
            flex
            items-center
            gap-2

            bg-sky-500
            hover:bg-sky-600

            text-white

            font-semibold

            px-6
            py-3

            rounded-xl

            shadow-md
            hover:shadow-xl

            transition-all
            "
            >

            Explore Tour

            <ArrowRight size={18}/>

            </Link>

            </div>

            </div>

            </div>

);

};

export default PopularTourCard;