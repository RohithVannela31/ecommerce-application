import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import heroImage from "../assets/download.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* LEFT TEXT */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Elevate Your Everyday Style
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Discover premium essentials crafted for modern living. Clean
              design. Quality products. Delivered fast.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#products"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Shop Now
              </a>

              <Link
                to="/orders"
                className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition font-medium"
              >
                View Orders
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="mt-12 md:mt-0">
            <div className="w-80 h-80 bg-white rounded-3xl shadow-xl flex items-center justify-center text-gray-400 text-lg">
              <img
                src={heroImage}
                alt="Hero"
                className="w-80 h-80 object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Latest Products</h2>

        {loading && <p>Loading...</p>}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
              />

              <h3 className="mt-5 font-semibold text-lg">{product.name}</h3>

              <p className="mt-2 text-black font-bold">₹{product.price}</p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to={`/product/${product._id}`}
                  className="bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    dispatch(addToCart({ ...product, quantity: 1 }))
                  }
                  className="border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
