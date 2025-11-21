import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../../api";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");

  const fetchBrands = async () => {
    const res = await api.get("/brands");
    setBrands(res.data);
  };

  const addBrand = async () => {
    if (!name.trim()) return alert("Enter brand name");
    await api.post("/admin/brand", { name });
    setName("");
    fetchBrands();
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Brands
        </h2>

        {/* Add Brand Form */}
        <div className="flex gap-3 mb-6">
          <input
            placeholder="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={addBrand}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Add
          </button>
        </div>

        {/* Brands List */}
        <ul className="bg-white shadow rounded-lg p-4 space-y-2 w-full max-w-md">
          {brands.map((b) => (
            <li
              key={b._id}
              className="px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 font-medium"
            >
              {b.name}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
