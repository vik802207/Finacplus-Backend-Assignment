import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then((res) =>
      setOrders(res.data.orders || res.data)
    );
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-6 flex flex-col space-y-4">
        <h3 className="text-xl font-semibold mb-4">Admin</h3>

        <Link
          to="/admin/products"
          className="text-gray-300 hover:text-white transition"
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          className="text-gray-300 hover:text-white transition"
        >
          Orders
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Orders</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 font-semibold">Order ID</th>
                <th className="p-3 font-semibold">User</th>
                <th className="p-3 font-semibold">Total</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{o._id}</td>
                  <td className="p-3">{o.userId}</td>
                  <td className="p-3 font-medium">₹{o.totalAmount}</td>
                  <td className="p-3">{o.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
