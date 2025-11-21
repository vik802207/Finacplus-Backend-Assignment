import React, { useEffect, useState } from "react";
import api from "../../api";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{o.userId}</td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  ₹{o.total}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      o.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : o.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
