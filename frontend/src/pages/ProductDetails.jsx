import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Product added to cart 🛒");
  };

  if (!product)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading product...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[550px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            {product.name}
          </h1>

          <p className="text-3xl font-semibold text-black mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Stock Status */}
          <p
            className={`mb-6 font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Quantity */}
          <div className="mb-8">
            <label className="block mb-2 font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 text-lg rounded-xl transition font-semibold ${
              product.stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
