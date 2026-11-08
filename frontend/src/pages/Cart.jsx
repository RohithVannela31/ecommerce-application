import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [removingId, setRemovingId] = useState(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      dispatch(removeFromCart(id));
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`flex items-center justify-between bg-white border rounded-xl p-6 shadow-sm transition-all duration-300 ${
                  removingId === item._id
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-black font-medium mt-1">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT - Summary */}
          <div className="bg-white border rounded-xl p-6 shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Tax (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full mt-6 bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
