import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage your store performance and operations.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold mt-2">₹ --</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold mt-2">--</h2>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-black">
              Manage Products
            </h3>
            <p className="text-gray-500 text-sm">
              Add, edit or remove products from your store.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition group"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-black">
              Manage Orders
            </h3>
            <p className="text-gray-500 text-sm">
              View and update customer orders.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
