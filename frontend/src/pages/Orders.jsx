import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/order/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-10">My Orders</h2>

      {loading && (
        <div className="text-center py-20 text-gray-500">Loading orders...</div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-6">{error}</div>
      )}

      {orders.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-20">
          You haven't placed any orders yet.
        </div>
      )}

      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium text-gray-800">{order._id}</p>
              </div>

              <span
                className={`px-4 py-1 text-sm rounded-full font-medium ${getStatusStyle(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Products */}
            <div className="space-y-6">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center gap-5">
                    {/* Image */}
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/80"
                      }
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    {/* Info */}
                    <div>
                      <p className="font-semibold">
                        {item.product?.name || "Product Removed"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{item.product?.price || 0} each
                      </p>
                    </div>
                  </div>

                  {/* Item Total */}
                  <p className="font-semibold">
                    ₹{(item.product?.price || 0) * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between mt-6 font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
