import React, { useEffect, useState } from "react";
import api from "../../../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    stock: 0,
    image: ""
  });

  // 🔥 Token direct yahin read hoga
  const token = localStorage.getItem("adminToken");
  console.log("Admin Token:", token);

  const fetchData = async () => {
    const res = await api.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setProducts(res.data.products || res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const add = async () => {
    await api.post("/admin/product", form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      stock: 0,
      image: ""
    });

    setOpenModal(false);
    fetchData();
  };

  const remove = async (id) => {
    await api.delete(`/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-6">
        <h3 className="text-xl font-semibold mb-4">Admin</h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products</h2>

          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
           <thead>
  <tr className="bg-gray-200 text-left">
    <th className="p-3">Image</th>
    <th className="p-3">Name</th>
    <th className="p-3">Description</th>
    <th className="p-3">Category</th>
    <th className="p-3">Brand</th>
    <th className="p-3">Price</th>
    <th className="p-3">Stock</th>
    <th className="p-3">Action</th>
  </tr>
</thead>

<tbody>
  {products.map((p) => (
    <tr key={p._id} className="border-b hover:bg-gray-100 transition">

      {/* IMAGE */}
      <td className="p-3">
        <img
          src={p.image}
          alt={p.name}
          className="w-14 h-14 object-cover rounded"
        />
      </td>

      {/* NAME */}
      <td className="p-3 font-semibold">{p.name}</td>

      {/* DESCRIPTION */}
      <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
        {p.description}
      </td>

      {/* CATEGORY */}
      <td className="p-3">{p.category}</td>

      {/* BRAND */}
      <td className="p-3">{p.brand}</td>

      {/* PRICE */}
      <td className="p-3">₹{p.price}</td>

      {/* STOCK */}
      <td className="p-3">{p.stock}</td>

      {/* ACTION */}
      <td className="p-3">
        <button
          onClick={() => remove(p._id)}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
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

      {/* Add Product Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fade">

            <h3 className="text-xl font-bold mb-4 text-gray-800">Add Product</h3>

            {/* FORM FIELDS */}
            <input
              placeholder="Product Name"
              className="px-3 py-2 border rounded w-full mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="px-3 py-2 border rounded w-full mb-3 h-20"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              className="px-3 py-2 border rounded w-full mb-3"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />

            <input
              placeholder="Category"
              className="px-3 py-2 border rounded w-full mb-3"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input
              placeholder="Brand"
              className="px-3 py-2 border rounded w-full mb-3"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />

            <input
              type="number"
              placeholder="Stock"
              className="px-3 py-2 border rounded w-full mb-3"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            />

            <input
              placeholder="Image URL"
              className="px-3 py-2 border rounded w-full mb-4"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              <button
                onClick={add}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add Product
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
