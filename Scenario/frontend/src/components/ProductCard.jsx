import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-3">
      <Link to={`/products/${p._id}`} className="block">
        <img
          src={p.images?.[0] || "https://via.placeholder.com/300x200"}
          alt=""
          className="w-full h-40 object-cover rounded-lg"
        />

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          {p.title}
        </h3>

        <p className="text-gray-700 text-base font-medium">
          ₹{p.price}
        </p>
      </Link>
    </div>
  );
}
