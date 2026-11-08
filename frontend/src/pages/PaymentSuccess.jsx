import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 p-8 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        <Link
          to="/orders"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
