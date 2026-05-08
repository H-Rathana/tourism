import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../services/api";
import TourDetailsSkeleton from "../components/TourDetailsSkeleton";
import { FaChevronLeft } from 'react-icons/fa';
import BookingForm from "../components/BookingForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";





const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
  fetch(`${BASE_URL}/api/tours/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setTour(data);
      setTimeout(() => setLoading(false), 500);
    });
    
}, [id]);
  useEffect(() => {
  document.body.style.overflow = showModal ? "hidden" : "auto";
}, [showModal]);
      
  if (loading) return <TourDetailsSkeleton />;

  return (
    <div className="px-4 md:px-16 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 hover:bg-gray-300 rounded-lg"
      >
         <FaChevronLeft size={20} color="black" />
      </button>
      <span className="text-2xl font-sans font-bold">Tour Details</span>
      {/* Hero Image */}
      <div className="h-[250px] w-full md:h-[450px] rounded-2xl overflow-hidden">
        <img
          src={`${BASE_URL}/uploads/${tour.image}`}
          alt={tour.title}
          className="w-full h-full object-cover shadow-lg"
        />
      </div>

      {/* Main Content */}
      <div className="mt-8 grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-4xl font-bold">
            {tour.title}
          </h1>

          <div className="flex gap-4 text-gray-500 mt-2">
            <span>📍 {tour.location}</span>
            <span>⌛ {tour.duration}Days</span>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {tour.description}
          </p>

          {/* Highlights */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Highlights</h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Beautiful scenery</li>
              <li>Professional guide</li>
              <li>Best experience guaranteed</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE (Booking Box) */}
        <div className="flex justify-center md:block">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 md:sticky md:top-24">

            <p className="text-gray-500">From</p>
            <h2 className="text-3xl font-bold text-orange-500">
              ${tour.price}
            </h2>

            <button 
             onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  setShowModal(true);
                }
              }}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition">
              Book Now
            </button>

            <p className="text-sm text-gray-400 mt-4">
              No payment required now
            </p>
          </div>
        </div>

      </div>
       {showModal && (
      <BookingForm
        tour={tour}
        onClose={() => setShowModal(false)}
      />
    )}
    </div>
  );
};

export default TourDetails;