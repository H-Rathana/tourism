import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logopng.png"
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { useReactToPrint } from "react-to-print";

import { Download } from "lucide-react";

import API from "../services/api";

const TicketPage = () => {

  const { id } = useParams();

  const [ticket, setTicket] =
    useState(null);
  const ticketRef = useRef();
  const qrRef = useRef();

  const handlePrint = useReactToPrint({
  contentRef: ticketRef,
  documentTitle: `WanderEscape-Ticket-${ticket?.booking_id}`,
});
  const handleDownloadQR = async () => {

  if (!qrRef.current) return;

  const dataUrl = await toPng(qrRef.current, {
    cacheBust: true,
    pixelRatio: 3,
  });

  const link = document.createElement("a");

  link.download = `${ticketCode}.png`;

  link.href = dataUrl;

  link.click();

};
// Professional Ticket Code
  useEffect(() => {

    const fetchTicket =
      async () => {

        try {

          const res =
            await API.get(
              `/bookings/ticket/${id}`
            );

          setTicket(
            res.data
          );

        } catch (error) {

          console.error(error);

        }

      };

    fetchTicket();

  }, [id]);

  if (!ticket) {

    return (
      <div className="text-center py-20">
        Loading Ticket...
      </div>
    );

  }
  const ticketCode =
  `WE-${
    new Date(ticket.travel_date).getFullYear()
  }-${
    String(ticket.booking_id).padStart(6, "0")
  }`;
  return (
        <div 
    className="
    bg-gradient-to-r
from-sky-700
via-cyan-
to-blue-500

    "
    >
        <div className="min-h-screen bg-slate-100 py-10 px-4"
         >

  <div className="max-w-4xl mx-auto">

    <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden"
        ref={ticketRef}
    >

      {/* HEADER */}

      <div
  className="
  bg-gradient-to-br from-emerald-600 via-teal-400 to-sky-200
 text-white p-8
  "
>


{/* bg-gradient-to-br from-emerald-600 via-teal-400 to-sky-200 */}
  <div
  className="
  flex
  flex-col
  md:flex-row
  md:justify-between
  md:items-center
  gap-4
  "
>

    <div>

      <img src={logo} alt="WenderEscape" className="size-30" />

      <p className="opacity-90 text-sm md:text-xl">
        Official Travel E-Ticket
      </p>

    </div>

    <div className="flex gap-3 not-print">

        <button
          onClick={handlePrint}
          className="
          flex
          items-center
          gap-2
          bg-white
          text-sky-500
          px-5
          py-3
          rounded-xl
          font-semibold
          hover:bg-green-100
          transition
          "
        >
          <Download size={18} />
          Ticket
        </button>

        <button
          onClick={handleDownloadQR}
          className="
          flex
          items-center
          gap-2
          bg-green-500
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          hover:bg-green-600
          transition
          "
        >
          <Download size={18} />
          QR Code
        </button>

    </div>

  </div>

</div>

      {/* BODY */}

      <div className="p-4 md:p-8">

        <div className="flex flex-col md:flex-row justify-between gap-4">

          <div>
            <p className="text-slate-500">
              Booking Number
            </p>

            <h2 className="text-3xl font-bold">
              #{ticket.booking_id}
            </h2>
          </div>

          <span
  className={`
    self-start
    px-5
    py-2
    rounded-full
    font-semibold
    capitalize

    ${
      ticket.status === "approved"
        ? "bg-green-100 text-green-700"
        : ticket.status === "completed"
        ? "bg-blue-100 text-blue-700"
        : ticket.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : ticket.status === "cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    }
  `}
>
  {ticket.status === "approved" && "APPROVED ✓"}

  {ticket.status === "completed" && "COMPLETED ✔"}

  {ticket.status === "pending" && "PENDING"}

  {ticket.status === "cancelled" && "CANCELLED"}
</span>

        </div>

        {/* TRAVELER + TOUR */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-slate-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-4">
              Traveler Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>Name:</strong>{" "}
                {ticket.full_name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {ticket.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {ticket.phone}
              </p>

            </div>

          </div>

          <div className="bg-slate-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-4">
              Tour Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>Tour:</strong>{" "}
                {ticket.tour_title}
              </p>

              <p>
                <strong>Destination:</strong>{" "}
                {ticket.location}
              </p>

              <p>
                <strong>Guests:</strong>{" "}
                {ticket.people_count}
              </p>

              <p>
                <strong>Total Paid:</strong>{" "}
                ${ticket.total_price}
              </p>

            </div>

          </div>

        </div>

        {/* GUIDE */}

        <div
  className="
  mt-6
  bg-cyan-50
  border
  border-cyan-100
  rounded-2xl
  p-6
  "
>

  <h3 className="font-bold text-lg mb-4">
    Tour Guide Information
  </h3>

  <div className="space-y-2">

    <p>
      <strong>Name:</strong>{" "}
      {ticket.guide_name ||
        "Mr. Dara"}
    </p>

    <p>
      <strong>Phone:</strong>{" "}
      {ticket.guide_phone ||
        "+855 12 345 678"}
    </p>

  </div>

</div>

        {/* TRAVEL INFO */}

        <div
          className="
          mt-6
          bg-blue-50
          rounded-2xl
          p-6
          "
        >

          <h3 className="font-bold text-lg mb-4">
            Travel Information
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <p className="text-slate-500">
                Travel Date
              </p>

              <p className="font-semibold">
                {new Date(
                  ticket.travel_date
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Check-In
              </p>

              <p className="font-semibold">
                07:00 AM
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Departure
              </p>

              <p className="font-semibold">
                07:30 AM
              </p>
            </div>

          </div>

        </div>

        {/* PERFORATED DIVIDER */}

        <div className="relative my-10">

          <div
            className="
            absolute
            -left-12
            w-8
            h-8
            bg-slate-100
            rounded-full
            "
          />

          <div
            className="
            absolute
            -right-12
            w-8
            h-8
            bg-slate-100
            rounded-full
            "
          />

          <div
            className="
            border-t-2
            border-dashed
            border-slate-300
            "
          />
        </div>

        {/* MEETING POINT */}

        <div
          className="
          bg-orange-50
          border
          border-orange-100
          rounded-2xl
          p-6
          "
        >

          <h3 className="font-bold text-lg mb-3">
            Meeting Point
          </h3>

          <p>WanderEscape Office</p>

          <p>Phnom Penh, Cambodia</p>

        </div>
        {/* QR CODE */}

         <div
            ref={qrRef}
            className="
            mt-8
            bg-white
            border
            rounded-3xl
            p-8
            flex
            flex-col
            items-center
            "
          >

            <h3 className="text-xl font-bold">
                Check-In QR Code
            </h3>

            <p className="text-gray-500 mb-5 text-center">
              Scan this QR code during check-in.
              <br />
              It securely contains your booking information.
            </p>

            <div
                className=" bg-white p-5 rounded-3xl shadow-md border border-slate-200">

                <QRCodeCanvas
                  value={`BOOKING-${ticket.booking_id}`}
                  size={120}
                />

            </div>

            <p className="mt-4 text-xl font-bold tracking-widest text-sky-600">
                {ticketCode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
                Booking Reference Number
            </p>

            </div>
            <div className="mt-6 text-center">

  <p className="text-xs text-gray-400">
    This QR Code is unique for this booking.
  </p>

  <p className="text-xs text-gray-400">
    Do not share it with other travelers.
  </p>

</div>
        {/* SUPPORT */}

        <div
          className="
          mt-6
          bg-slate-50
          rounded-2xl
          p-6
          "
        >

          <h3 className="font-bold text-lg mb-3">
            Support Contact
          </h3>

          <p>+855 88 935 1504</p>

          <p>support@wanderescape.com</p>

        </div>
        <div
  className="
  mt-6
  bg-yellow-50
  border
  border-yellow-200
  rounded-2xl
  p-6
  "
>

  <h3 className="font-bold mb-3">
    Terms & Conditions
  </h3>

  <ul className="list-disc ml-5 text-gray-600 space-y-2">

    <li>
      Arrive 30 minutes before departure.
    </li>

    <li>
      Bring a valid ID card.
    </li>

    <li>
      Show this ticket during check-in.
    </li>

    <li>
      Contact support if you need assistance.
    </li>

  </ul>

</div>

      </div>

    </div>

  </div>

</div>
    </div>
    
  );

};

export default TicketPage;