import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import slide1 from "../assets/images/island.jpg";
import slide2 from "../assets/images/Mondulkiri2.jpg";
import slide3 from "../assets/images/AngkorToch.jpg";
import slide4 from "../assets/images/Boat.png";
import API from "../services/api";
import About from "../pages/About";
import AnimatedCounter from "../components/AnimatedCounter";

const slides = [
  {
    image: slide1,
    title: "Discover Cambodia's Hidden Wonders",
    subtitle:
      "Explore breathtaking islands and unforgettable adventures.",
  },
  {
    image: slide2,
    title: "Experience The Beauty Of Mondulkiri",
    subtitle:
      "Escape into nature, waterfalls, and fresh mountain air.",
  },
  {
    image: slide3,
    title: "Explore Ancient Angkor Wat",
    subtitle:
      "Discover Cambodia's rich culture and heritage.",
  },
  {
    image: slide4,
    title: "Relax With Natural",
    subtitle:
      "Enjoy peaceful forest and local experiences.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [stats, setStats] = useState({

    totalBookings: 0,

    totalTours: 0,

    totalUsers: 0,

    completedBookings: 0,

    happyTravelers: 0,

});
  const nextSlide = () => {
    setCurrent((prev) =>
      (prev + 1) % slides.length
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  useEffect(() => {
     const loadStats = async()=>{

      try{

         const res =
            await API.get(
               "/user-dashboard/home-stats"
            );

         setStats(res.data);

      }catch(err){

         console.log(err);

      }

   };

   loadStats();
    const interval = setInterval(
      nextSlide,
      8000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
      relative
      h-[60vh]
      md:h-[85vh]
      overflow-hidden
      "
    >
      {/* Background Image */}
      <img
        src={slides[current].image}
        alt="slide"
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        transition-all
        duration-700
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div
        className="
        relative
        z-10
        h-full
        max-w-7xl
        mx-auto
        px-6
        flex
        items-center
        "
      >
        <div className="max-w-3xl text-white">

          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} />
            <span className="uppercase tracking-widest text-sm">
              Cambodia Tourism
            </span>
          </div>

          <h1
            className="
            text-4xl
            md:text-6xl
            font-bold
            leading-tight
            mb-6
            "
          >
            {slides[current].title}
          </h1>

          <p
            className="
            text-lg
            md:text-xl
            text-slate-200
            mb-8
            "
          >
            {slides[current].subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate("/tours")
              }
              className="
              bg-orange-500
              hover:bg-orange-600
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
              "
            >
              Explore Tours
            </button>

            <button
                onClick={() =>
                  navigate("/about-us")
                }
                className="
                border
                border-white
                hover:bg-white
                hover:text-black
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                Learn More
              </button>

          </div>

          {/* Stats */}
          <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          mt-12
          max-w-3xl
          "
          >

            <div>

              <h2 className="text-4xl font-bold">

                <AnimatedCounter
                  end={stats.totalBookings}
                />

                +

                </h2>

             <p className="text-slate-300">Bookings</p>

              </div>

            <div>

          <h2 className="text-4xl font-bold">
          <AnimatedCounter
                  end={stats.totalTours}
                />
          </h2>

          <p className="text-slate-300">

          Tours

          </p>

          </div>

          <div>

          <h2 className="text-4xl font-bold">
          <AnimatedCounter
                  end={stats.totalUsers}
                />
          +

          </h2>

          <p className="text-slate-300">

          Travelers

          </p>

          </div>

          <div>

          <h2 className="text-4xl font-bold">
          <AnimatedCounter
                  end={stats.happyTravelers}
                />
            %
          </h2>

          <p className="text-slate-300">

          Satisfaction

          </p>

          </div>

          </div>

        </div>
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        bg-white/20
        backdrop-blur-md
        p-3
        rounded-full
        text-white
        hover:bg-white/30
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        bg-white/20
        backdrop-blur-md
        p-3
        rounded-full
        text-white
        hover:bg-white/30
        "
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div
        className="
        absolute
        bottom-8
        left-1/2
        -translate-x-1/2
        flex
        gap-3
        "
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              setCurrent(i)
            }
            className={`
            w-3
            h-3
            rounded-full
            transition

            ${
              i === current
                ? "bg-white w-8"
                : "bg-white/50"
            }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;