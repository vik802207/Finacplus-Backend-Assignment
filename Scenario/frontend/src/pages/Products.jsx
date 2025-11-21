import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    if (!title.trim()) return; // simple validation
    await api.post("/admin/product", { title });
    setTitle("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/admin/product/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b">Title</th>
                <th className="text-left px-4 py-2 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{p.title}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
    </div>
  );
}
