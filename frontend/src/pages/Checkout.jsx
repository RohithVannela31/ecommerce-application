import { useSelector, useDispatch } from "react-redux";
import api from "../services/axiosInstance";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + tax;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isFormValid =
    address.name &&
    address.phone &&
    address.addressLine &&
    address.city &&
    address.pincode;

  const openRazorpay = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/payment/create-order", {
        amount: totalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "MERN Shop",
        description: "Order Payment",

        handler: async function (response) {
          await api.post("/payment/verify-payment", {
            ...response,
            products: cartItems.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            shippingAddress: address,
          });

          dispatch(clearCart());
          navigate("/payment-success");
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-10">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT - Shipping */}
        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Shipping Details</h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="addressLine"
              placeholder="Address"
              value={address.addressLine}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-8 shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t my-6"></div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax (5%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={() => {
              if (!isFormValid) {
                alert("Please fill all shipping details");
                return;
              }
              setShowModal(true);
            }}
            disabled={loading}
            className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Order</h3>

            <p className="text-gray-600 mb-6">Total Amount: ₹{totalAmount}</p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  openRazorpay();
                }}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
