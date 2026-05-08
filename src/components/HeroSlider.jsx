import { useState } from "react";
import { useEffect } from "react";
import slide1 from "../assets/images/island.jpg"
import slide2 from "../assets/images/Mondulkiri2.jpg"
import slide3 from "../assets/images/AngkorToch.jpg"
import slide4 from "../assets/images/Boat.png"

const images = [slide1, slide2, slide3,slide4];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[30vh] md:h-[60vh] overflow-hidden">
      
      {/* Image */}
      <img
        src={images[current]}
        alt="slide"
        className="w-full h-full object-cover transition duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0  flex flex-col justify-center px-6 md:px-16 text-white">
        
        <h1 className="text-2xl md:text-5xl font-bold mb-3 font-serif">
          Find your dream trip 
        </h1>
        <h1 className="text-2xl md:text-5xl font-bold mb-5 font-serif">
          On WonderEscape
        </h1>
        <p className="text-sm md:text-xl mb-6 font-sans">
          We offer unbeatable price & excellent service
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <button className="bg-white text-black px-6 py-2 rounded-full">
            Book now
          </button>
          <span className="text-sm md:text-lg">+855 889351504</span>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;