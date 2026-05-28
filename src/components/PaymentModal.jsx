import khqr from "../assets/images/qr.png"
const PaymentModal = ({
  bookingId,
  onClose,
  onPaid,
}) => {

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-3">
          Scan to Pay
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Scan with ABA, ACLEDA, Wing or Bakong
        </p>

        {/* KHQR IMAGE */}
        <div className="flex justify-center">

          <img
            src={khqr}
            alt="KHQR"
            className="w-72 h-72 object-contain rounded-2xl border"
          />

        </div>

        {/* BOOKING ID */}
        <div className="bg-gray-100 rounded-xl p-3 mt-5 text-center">

          <p className="text-gray-500 text-sm">
            Booking Reference
          </p>

          <p className="font-bold text-lg">
            #{bookingId}
          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="w-1/2 py-3 border rounded-2xl hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={() => onPaid(bookingId)}
            className="w-1/2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl"
          >
            I Have Paid
          </button>

        </div>

      </div>

    </div>

  );

};

export default PaymentModal;