import {
  useState,
  useEffect
} from "react";

import API,
{
  BASE_URL
}
from "../services/api";

import {
  Calendar,
  Users,
  Wallet,
  CheckCircle,
  Clock3,
  XCircle,
  BadgeCheck,
  Search,
  BriefcaseBusiness
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {

  const [bookings,
  setBookings] =
    useState([]);

  const [search,
  setSearch] =
    useState("");

  const [filter,
  setFilter] =
    useState("all");
  const navigate =
  useNavigate();

  const fetchBookings =
    async () => {

      try {

        const res =
          await API.get(
            "/bookings/my-bookings"
          );

        setBookings(
          res.data
        );

      } catch(error){

        console.log(error);

      }

    };
    useEffect(() => {

    fetchBookings();

  }, []);

  const filteredBookings =
  bookings.filter((booking) => {

    const matchSearch =
      booking.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchFilter =
      filter === "all"
        ? true
        : booking.status?.toLowerCase() ===
          filter.toLowerCase();

    return (
      matchSearch &&
      matchFilter
    );

  });
  
  const getStatusStyle = (status) => {

  switch (status?.toLowerCase()) {

    case "approved":
      return "bg-green-100 text-green-700";

    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "rejected":
      return "bg-red-100 text-red-700";

    case "completed":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";

  }

};
  return (

    <div
      className="
      min-h-screen
      bg-slate-100
      py-12
      px-4
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-8
          "
        >
          My Bookings
        </h1>

        {/* Search */}

        <div
          className="
          relative
          mb-6
          "
        >

          <Search
            className="
            absolute
            left-4
            top-4
            text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            bg-white
            rounded-2xl
            border
            pl-12
            py-4
            "
          />

        </div>

        {/* Filters */}

        <div
  className="
  flex
  gap-3
  flex-wrap
  mb-8
  "
>

  {[
    "all",
    "Pending",
    "Approved",
    "Rejected",
    "Completed"
  ].map((status) => (

    <button
      key={status}
      onClick={() =>
        setFilter(status)
      }
      className={`
        px-5
        py-2
        rounded-full
        font-medium
        transition

        ${
          filter === status
            ? "bg-sky-500 text-white"
            : "bg-white text-gray-700 hover:bg-slate-100"
        }
      `}
    >
      {status}
    </button>

  ))}

</div>

        {/* Booking Cards */}

       <div
  className="
  grid
  md:grid-cols-2
  gap-8
  "
>

  {filteredBookings.length > 0 ? (

    filteredBookings.map(
      (booking) => (

        <div
          key={booking.booking_id}
          className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all
          duration-300
          "
        >

          <img
            src={`${BASE_URL}/uploads/${booking.image}`}
            alt={booking.title}
            className="
            w-full
            h-64
            object-cover
            "
          />

          <div className="p-6">

            <h2
              className="
              text-3xl
              font-bold
              mb-5
              "
            >
              {booking.title}
            </h2>

            <div
              className="
              space-y-3
              text-slate-600
              "
            >

             <div className="space-y-3 text-slate-600">

                <p className="flex items-center gap-2">

                    <p>Booking Date</p>
                    <Calendar size={18} />
                    {new Date(
                    booking.booking_date
                    ).toLocaleDateString()}

                </p>

                <p className="flex items-center gap-2">

                    <p>Travel Date</p>
                    <Calendar size={18} />
                    
                    {new Date(
                    booking.travel_date
                    ).toLocaleDateString()}

                </p>

                <p className="flex items-center gap-2">

                    <Users size={18} />

                    {booking.people_count}
                    {" "}Travelers

                </p>

                <p className="flex items-center gap-2">

                    <Wallet size={18} />

                    ${booking.total_price}

                </p>

                </div>
            </div>

            <div className="mt-5">

              <span
                className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${getStatusStyle(
                    booking.status
                    )}
                `}
                >

                {booking.status ===
                    "approved" && (
                    <CheckCircle size={16} />
                )}

                {booking.status ===
                    "pending" && (
                    <Clock3 size={16} />
                )}

                {booking.status ===
                    "rejected" && (
                    <XCircle size={16} />
                )}

                {booking.status ===
                    "completed" && (
                    <BadgeCheck size={16} />
                )}

                {booking.status}

                </span>

            </div>

            <div
              className="
              flex
              gap-3
              mt-6
              "
            >

              {booking.status ===
                "Approved" && (

                <button
                  onClick={() =>
                    navigate(
                      `/ticket/${booking.booking_id}`
                    )
                  }
                  className="
                  flex-1
                  bg-sky-500
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-sky-600
                  "
                >
                  View Ticket
                </button>

              )}

              {/* {booking.status ===
                "Pending" && (

                <button
                  className="
                  flex-1
                  bg-red-500
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-red-600
                  "
                >
                  Cancel Booking
                </button>

              )} */}

            </div>

          </div>

        </div>

      )
    )

  ) : (

    <div
      className="
      col-span-full
      bg-white
      rounded-3xl
      p-12
      text-center
      shadow
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        "
      >
        <div
  className="
  flex
  flex-col
  items-center
  justify-center
  "
>

  <BriefcaseBusiness
    size={60}
    className="
    text-slate-300
    mb-4
    "
  />

  <h2
    className="
    text-3xl
    font-bold
    "
  >
    No Bookings Found
  </h2>

  <p
    className="
    mt-3
    text-slate-500
    "
  >
    Try another search or
    explore new tours.
  </p>

</div>
      </h2>

    </div>

  )}

</div>

      </div>

    </div>

  );

};

export default MyBookings;