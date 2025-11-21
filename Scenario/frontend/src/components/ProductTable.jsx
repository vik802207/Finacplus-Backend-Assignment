import React, { useEffect, useState } from "react";
import api from "../api";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await api.get("/product");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {p.title}
                </td>
                <td className="py-3 px-4">{p.brand}</td>
                <td className="py-3 px-4">₹{p.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      p.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
