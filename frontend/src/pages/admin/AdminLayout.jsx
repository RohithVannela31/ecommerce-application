import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      {/* CENTER WRAPPER */}
      <div className="w-full max-w-7xl px-6">
        <div className="flex rounded-2xl overflow-hidden shadow-xl bg-white min-h-[85vh]">
          {/* ================= SIDEBAR ================= */}
          <div
            className={`bg-black text-white transition-all duration-300 ${
              collapsed ? "w-20" : "w-64"
            }`}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              {!collapsed && (
                <h2 className="text-lg font-semibold">Admin Panel</h2>
              )}

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ☰
              </button>
            </div>

            <nav className="mt-6 space-y-2 px-2">
              {menu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-sm transition ${
                    location.pathname === item.path
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {collapsed ? item.name[0] : item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* ===== ADMIN TOP HEADER ===== */}
            <div className="flex items-center justify-between px-10 py-6 border-b bg-white">
              <div>
                <h1 className="text-xl font-semibold">
                  {menu.find((m) => m.path === location.pathname)?.name ||
                    "Dashboard"}
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your store operations efficiently.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="flex-1 p-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
