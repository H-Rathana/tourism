import { useState } from "react";
import API, { BASE_URL } from "../services/api";
import PaymentModal from "../components/PaymentModal";

const BookingForm = ({ tour, onClose }) => {

  const [loading, setLoading] =
    useState(false);

  const [showPayment, setShowPayment] =
    useState(false);

  const [bookingId, setBookingId] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    travel_date: "",
    people_count: 1,
    special_requests: "",
  });

  // ✅ TOTAL PRICE
  const totalPrice =
    Number(tour.price) *
    Number(form.people_count);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ✅ VALIDATION
  const validate = () => {

    const newErrors = {};

    if (!form.full_name.trim()) {
      newErrors.full_name =
        "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    }

    if (!form.travel_date) {
      newErrors.travel_date =
        "Travel date is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );

  };

  // ✅ CREATE BOOKING
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!validate()) return;

      try {

        setLoading(true);

        const bookingData = {

          ...form,

          tour_id:
            tour.tour_id,

          total_price:
            totalPrice,

        };

        const res =
          await API.post(
            "/bookings",
            bookingData
          );

        console.log(
          "BOOKING RESPONSE:",
          res.data
        );

        const booking =
          res.data.booking;

        // ✅ EXISTING BOOKING
        if (res.data.existing) {

          alert(
            "You already have a pending booking for this tour."
          );

        }

        // ✅ SAVE BOOKING ID
        setBookingId(
          booking.booking_id
        );

        // ✅ OPEN PAYMENT MODAL
        setShowPayment(true);

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Booking failed"
        );

      } finally {

        setLoading(false);

      }

    };

  // ✅ USER CLICKED PAID
  const handlePaid =
    async () => {

      try {

        alert(
          "Payment submitted successfully"
        );

        setShowPayment(false);

        onClose();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">

        {/* HEADER */}
        <div className="relative h-52">

          <img
            src={`${BASE_URL}/uploads/${tour.image}`}
            alt={tour.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">

            <p className="uppercase tracking-widest text-sm">
              Tour Booking
            </p>

            <h2 className="text-3xl font-bold">
              {tour.title}
            </h2>

            <p className="mt-1">
              📍 {tour.location}
            </p>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6"
        >

          <InputField
            label="Full Name *"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Your full name"
            error={errors.full_name}
          />

          <InputField
            label="Email *"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            error={errors.email}
          />

          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+855..."
          />

          <InputField
            label="Travel Date *"
            type="date"
            name="travel_date"
            value={form.travel_date}
            onChange={handleChange}
            error={errors.travel_date}
          />

          {/* TRAVELERS */}
          <div>

            <label className="font-medium">
              Travelers
            </label>

            <select
              name="people_count"
              value={form.people_count}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >

              {[1,2,3,4,5].map((n) => (
                <option
                  key={n}
                  value={n}
                >
                  {n}
                </option>
              ))}

            </select>

          </div>

          {/* SPECIAL REQUEST */}
          <div className="md:col-span-2">

            <label className="font-medium">
              Special Requests
            </label>

            <textarea
              rows={4}
              name="special_requests"
              value={form.special_requests}
              onChange={handleChange}
              placeholder="Dietary needs, accessibility..."
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

          </div>

          {/* SUMMARY */}
          <div className="md:col-span-2 bg-slate-100 rounded-2xl p-5">

            <h3 className="text-xl font-bold mb-4">
              Booking Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Price per person</span>
              <span>${tour.price}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Travelers</span>
              <span>x {form.people_count}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white disabled:opacity-50"
            >

              {loading
                ? "Processing..."
                : "Confirm Booking →"}

            </button>

          </div>

        </form>

      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (

        <PaymentModal
          bookingId={bookingId}
          onClose={() =>
            setShowPayment(false)
          }
          onPaid={handlePaid}
        />

      )}

    </div>

  );

};

// ✅ REUSABLE INPUT COMPONENT
const InputField = ({
  label,
  error,
  ...props
}) => (

  <div>

    <label className="font-medium">
      {label}
    </label>

    <input
      {...props}
      className={`w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
        error
          ? "border-red-500"
          : ""
      }`}
    />

    {error && (

      <p className="text-red-500 text-sm mt-1">
        {error}
      </p>

    )}

  </div>

);

export default BookingForm;