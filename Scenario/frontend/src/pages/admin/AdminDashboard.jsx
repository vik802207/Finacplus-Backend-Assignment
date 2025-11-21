import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-bold mb-2">Admin</h3>
        <div className="h-px bg-gray-700 mb-3"></div>

        <Link
          to="/admin/products"
          className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
        >
          Orders
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-gray-700 text-lg">
          Use the sidebar to manage products and orders.
        </p>
      </div>
    </div>
  );
}
