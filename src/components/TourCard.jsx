import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
      {/* Image */}
      <div className="relative">
        
        <img
          onClick={() => navigate(`/tours/${tour.tour_id}`)}
          src={`${BASE_URL}/uploads/${tour.image}`}
          alt={tour.title}
          className="w-full h-52 object-cover "
        />

        {/* Badge */}
        {tour.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            {tour.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Category */}
        {/* <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          {tour.category}
        </span> */}

        {/* Location + Rating */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>📍 {tour.location}</span>
          <span>⌛ {tour.duration}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mt-2">
          {tour.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {tour.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-400 text-sm">from</span>
            <p className="text-xl font-bold text-gray-800">
              ${tour.price}   <span className="text-gray-400 text-sm font-light">per person</span>
            </p>
          </div>

          <button
          onClick={() => navigate(`/tours/${tour.tour_id}`)}
  className="bg-orange-500 text-white px-4 py-2 rounded-full">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;