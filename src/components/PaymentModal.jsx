import { QRCodeCanvas } from "qrcode.react";

const PaymentModal = ({ qrCode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">

      <div className="bg-white p-6 rounded-2xl w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-4">
          KHQR Payment
        </h2>

        <div className="flex justify-center">
          <QRCodeCanvas
            value={qrCode}
            size={220}
          />
        </div>

        <p className="text-center text-gray-500 mt-4">
          Scan with ABA, ACLEDA, Wing or Bakong
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default PaymentModal;