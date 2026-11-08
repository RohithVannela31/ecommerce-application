import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-black">
          MERN Shop
        </Link>

        {/* CENTER - NAV LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>

          {user && (
            <>
              {/* CART */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 hover:text-black transition"
              >
                {/* Cart Icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>

                <span>Cart</span>

                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link to="/orders" className="hover:text-black transition">
                Orders
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-black transition">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* RIGHT - USER AREA */}
        <div className="relative">
          {user ? (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-black transition"
              >
                <span>{user.name}</span>

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex space-x-6 font-medium text-gray-700">
              <Link to="/login" className="hover:text-black transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-black transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
