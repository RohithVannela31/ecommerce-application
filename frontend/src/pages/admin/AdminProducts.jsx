import { useEffect, useState } from "react";
import api from "../../services/axiosInstance";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required");
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    form.append("image", image);

    await api.post("/products", form);

    resetForm();
    fetchProducts();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    if (image) form.append("image", image);

    await api.put(`/products/${editId}`, form);

    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ name: "", description: "", price: "", stock: "" });
    setImage(null);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <p className="text-gray-500 mt-1">
          Create, update or delete store products.
        </p>
      </div>

      {/* ===== Product Form ===== */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">
          {editId ? "Update Product" : "Add New Product"}
        </h2>

        <form
          onSubmit={editId ? handleUpdate : handleCreate}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded-lg px-4 py-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="md:col-span-2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="md:col-span-2 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              {editId ? "Update Product" : "Create Product"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ===== Product Table ===== */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{product.name}</td>

                <td className="px-6 py-4">₹{product.price}</td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => {
                      setEditId(product._id);
                      setFormData({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                      });
                    }}
                    className="px-4 py-2 text-sm bg-yellow-400 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
