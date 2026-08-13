import { useState } from "react";
import API, { BASE_URL } from "../services/api";
import PaymentModal from "../components/PaymentModal";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const BookingForm = ({ tour, onClose }) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [preparingPayment, setPreparingPayment] =
  useState(false);
  const [loading, setLoading] =
    useState(false);

  const [showPayment, setShowPayment] =
    useState(false);

  const [bookingId, setBookingId] =
  useState(null);

  const [errors, setErrors] =
    useState({});
  const [showSuccess,setShowSuccess] =useState(false);
  const [createdBooking, setCreatedBooking] =
  useState(null);

  const [pendingBooking, setPendingBooking] =useState(null);

  const { user } = useContext(AuthContext);
  
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    travel_date: "",
    people_count: 1,
    special_requests: "",
  });
//   useEffect(() => {

//   if (user && tour) {

//     setForm((prev) => ({

//       ...prev,

//       full_name: user.name,

//       email: user.email,

//       travel_date:tour.available_from

//     }));

//   }

// }, [user, tour]);

  // ✅ TOTAL PRICE
  useEffect(() => {

  if (!user || !tour) return;

  const availableSeats =
    Number(tour.remaining_seats) || 0;

  setForm((prev) => {

    let peopleCount =
      Number(prev.people_count) || 1;

    // Tour is full
    if (availableSeats === 0) {
      peopleCount = 0;
    }

    // Selected travelers exceed available seats
    else if (peopleCount > availableSeats) {
      peopleCount = availableSeats;
    }

    // Make sure at least 1 traveler
    else if (peopleCount < 1) {
      peopleCount = 1;
    }

    return {
      ...prev,

      full_name: user.name,
      email: user.email,
      travel_date: tour.available_from,

      people_count: peopleCount,
    };

  });

}, [user, tour]);
  const totalPrice =
    Number(tour.price) *
    Number(form.people_count);

  const EXCHANGE_RATE = 4100;

  const totalPriceKHR =
  totalPrice * EXCHANGE_RATE;

  const formattedKHR =
  new Intl.NumberFormat(
    "km-KH"
  ).format(totalPriceKHR);
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
    newErrors.full_name = "Full name is required";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!form.phone.trim()) {
    newErrors.phone = "Phone Number is required";
  }
  const availableSeats =
  Number(tour?.remaining_seats) || 0;

const travelers =
  Number(form.people_count) || 0;

if (availableSeats <= 0) {
  newErrors.people_count =
    "This tour is fully booked.";
}

else if (travelers > availableSeats) {
  newErrors.people_count =
    `Only ${availableSeats} ${
      availableSeats === 1
        ? "seat"
        : "seats"
    } remaining.`;
}

else if (travelers < 1) {
  newErrors.people_count =
    "Please select at least 1 traveler.";
}
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;

};

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validate()) return;

  const bookingData = {

    ...form,

    tour_id: tour.tour_id,

    total_price: totalPrice,

  };

 setPreparingPayment(true);

setPendingBooking(bookingData);

// Fake loading for better UX
await new Promise((resolve) =>
  setTimeout(resolve, 1800)
);

setPreparingPayment(false);

setShowPayment(true);

};

  const handlePaid =
  async () => {

    try {

      setProcessingPayment(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 2200)
      );

      setLoading(true);

      const res =
        await API.post(
          "/bookings",
          pendingBooking
        );

      console.log(
        "BOOKING CREATED:",
        res.data
      );

      toast.success(
        "Booking submitted successfully"
      );

      toast.success(
        "We are processing your ticket. It will arrive in your notifications soon."
      );

      const booking =
      res.data.booking;

    setCreatedBooking(
      booking
    );

    setShowPayment(false);
    setProcessingPayment(false);
    setShowSuccess(true);

    } catch(error){

      setProcessingPayment(false);

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Booking failed"
      );

    } finally {

      setLoading(false);

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
            label="Full Name"
            name="full_name"
            value={form.full_name}
            readOnly
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            readOnly
          />

          <InputField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+855..."
            error={errors.phone}
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
              disabled={Number(tour.remaining_seats) <= 0}
              className="w-full mt-2 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >

              {Array.from(
                {
                  length: Number(tour.remaining_seats) || 0,
                },
                (_, index) => index + 1
              ).map((n) => (
                <option
                  key={n}
                  value={n}
                >
                  {n}
                </option>
              ))}

            </select>

            {/* AVAILABLE SEATS */}
            <p className="mt-2 text-sm text-gray-500">
              {Number(tour.remaining_seats) > 0 ? (
                <>
                  <span className="font-medium text-green-600">
                    {tour.remaining_seats}
                  </span>{" "}
                  {Number(tour.remaining_seats) === 1
                    ? "seat"
                    : "seats"}{" "}
                  remaining
                </>
              ) : (
                <span className="font-medium text-red-500">
                  This tour is fully booked.
                </span>
              )}
            </p>

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
            
            <div className="flex justify-between mb-2">
              <span>Durations</span>
              <span>{tour.duration} day</span>
            </div>
            <div
          className="
          flex justify-between mb-2
          "
        >

          <span>

            Tour Departure Date

          </span>

          <h3 className="text-lg font-bold text-sky-700">

            {
              new Date(tour.available_from).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Phnom_Penh",
                }
            )
             }

          </h3>

        </div>
            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold">
            <span>Total (USD)</span>
            <span>
              $
              {Number(totalPrice).toFixed(2)}
            </span>
          </div>

            <div className="flex justify-between mt-3 text-lg font-semibold text-orange-600">
              <span>Total (KHR)</span>
              <span>
                {formattedKHR}៛
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500 border-t pt-3">
              Exchange Rate:
              <span className="font-medium">
                {" "}
                1 USD = {EXCHANGE_RATE.toLocaleString()}៛
              </span>
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
            {processingPayment && (

                <div className="
                fixed
                inset-0
                z-[999]
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
                ">

                <div className="
                bg-white
                rounded-3xl
                w-[380px]
                p-10
                text-center
                ">

                <div
                className="
                w-16
                h-16
                mx-auto
                rounded-full
                border-[6px]
                border-sky-200
                border-t-sky-500
                animate-spin
                "
                />

                <h2 className="mt-8 text-2xl font-bold">

                Verifying Payment

                </h2>

                <p className="mt-3 text-slate-500">

                Please wait while we verify your payment and reserve your seat.

                </p>

                <div className="mt-6">

                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">

                <div className="h-full bg-sky-500 animate-pulse w-full"/>

                </div>

                </div>

                </div>

                </div>

                )}
            {
              showSuccess && (

              <div
                className="
                fixed
                inset-0
                z-50
                bg-black/50
                flex
                items-center
                justify-center
                "
              >

                <div
                  className="
                  bg-white
                  rounded-3xl
                  p-8
                  w-full
                  max-w-lg
                  text-center
                  "
                >

                  <div className="text-6xl mb-4">
                    🎉
                  </div>

                  <h2
                    className="
                    text-3xl
                    font-bold
                    mb-3
                    "
                  >
                    Booking Submitted
                  </h2>

                  <p className="text-gray-500">
                    Your booking request
                    has been submitted.
                  </p>

                  <div
                    className="
                    bg-slate-50
                    rounded-2xl
                    p-5
                    mt-6
                    text-left
                    "
                  >

                    <p>
                      <strong>Tour:</strong>
                      {" "}
                      {tour.title}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(form.travel_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          timeZone: "Asia/Phnom_Penh",
                        }
                      )}
                    </p>

                    <p>
                      <strong>Travelers:</strong>
                      {" "}
                      {form.people_count}
                    </p>

                    <p>
                      <strong>Total:</strong>
                      {" "}
                      ${totalPrice}
                    </p>

                    <p
                      className="
                      mt-3
                      text-yellow-600
                      font-semibold
                      "
                    >
                      Status:
                      Pending Approval
                    </p>

                  </div>
                  <div
                      className="
                      mt-6
                      flex
                      gap-3
                      "
                    >

                      <button
                        onClick={() => {

                          window.location.href =
                          "/my-bookings";

                        }}
                        className="
                        flex-1
                        bg-sky-500
                        text-white
                        py-3
                        rounded-xl
                        "
                      >
                        View My Bookings
                      </button>

                      <button
                        onClick={onClose}
                        className="
                        flex-1
                        border
                        py-3
                        rounded-xl
                        "
                      >
                        Continue Browsing
                      </button>

                    </div>
                                    </div>

              </div>

              )
              }
          </div>

        </form>

      </div>
      {preparingPayment && (

          <div
          className="
          fixed
          inset-0
          z-[999]
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          "
          >

          <div
          className="
          bg-white
          rounded-3xl
          w-[400px]
          p-10
          text-center
          "
          >

          <div
          className="
          w-16
          h-16
          mx-auto
          rounded-full
          border-[6px]
          border-orange-200
          border-t-orange-500
          animate-spin
          "
          />

          <h2
          className="
          text-2xl
          font-bold
          mt-8
          "
          >

          Preparing Payment

          </h2>

          <p
          className="
          mt-3
          text-slate-500
          leading-7
          "
          >

          Calculating your booking,
          checking seat availability,
          and generating your secure KHQR payment.

          </p>

          </div>

          </div>

          )}
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