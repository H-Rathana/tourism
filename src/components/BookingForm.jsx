import { useState } from "react";
import { BASE_URL } from "../services/api";



const BookingForm = ({ tour, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travelers: 1,
    requests: "",
  });
  const [errors, setErrors] = useState({});
 const validate = () => {
  let newErrors = {};

  if (!form.name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!form.date) {
    newErrors.date = "Tour date is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleSubmit = (e) => {
  e.preventDefault();

  const isValid = validate();

  console.log("Validation result:", isValid); // DEBUG

  if (!isValid) return;

  console.log("Form Submitted:", form);
};
  const price = tour.price * form.travelers;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      
      {/* Modal Box */}
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="relative h-40 md:h-52">
          <img
            src={`${BASE_URL}/uploads/${tour.image}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 text-white">
            <p className="text-sm">BOOK YOUR TOUR</p>
            <h2 className="text-xl md:text-3xl font-bold">
              {tour.title}
            </h2>
            <span className="text-sm">
              📍 {tour.location}
            </span>
          </div>

          {/* Close
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-red-400"
          >
             <IoMdClose size={24} color="white" />
          </button> */}
        </div>

        {/* Form */}
        <div  className="overflow-y-auto p-6 flex-1">
            <form  
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4">
                <div>
            <label>Full Name *</label>
           <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 mt-1 ${
                    errors.name ? "border-red-500" : ""
                }`}
                placeholder="Your name"
            />
            {errors.name && (
                 <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label>Email *</label>
           <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 mt-1 ${
                    errors.email ? "border-red-500" : ""
                }`}
                placeholder="you@email.com"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="+855..."
            />
          </div>

          <div>
            <label>Tour Date *</label>
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 mt-1 ${
                    errors.date ? "border-red-500" : ""
                }`}
            />
            {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div>
            <label>Travelers</label>
            <select
              name="travelers"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              {[1,2,3,4,5].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label>Special Requests</label>
            <textarea
              name="requests"
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="Dietary needs, accessibility..."
            />
          </div>

          {/* Price Box */}
          <div className="md:col-span-2 bg-gray-100 p-4 rounded-xl mt-2">
            <div className="flex justify-between text-sm">
              <span>Price per person</span>
              <span>${tour.price}</span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span>Travelers</span>
              <span>x {form.travelers}</span>
            </div>

            <hr className="my-2"/>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${price}</span>
            </div>
          </div>
          {/* <div className="md:col-span-2 flex justify-end gap-4 mt-6 border-t pt-4"></div> */}
           <div className="md:flex-row gap-4 mt-4 pt-4 col-span-2 flex justify-end">

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full md:w-auto px-6 py-3 rounded-full border-2 border-teal-600 text-teal-700 hover:bg-teal-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                >
                    Confirm Booking →
                </button>
            </div>
            </form>
        </div>
            
        </div>
    </div>
  );
};

export default BookingForm;