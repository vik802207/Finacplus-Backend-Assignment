/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold mb-5">All Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold">User</th>
                <th className="py-3 px-4 text-sm font-semibold">Total Amount</th>
                <th className="py-3 px-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{o.userId}</td>
                  <td className="py-3 px-4 font-medium">₹{o.totalAmount}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      o.orderStatus === "Delivered"
                        ? "text-green-600"
                        : o.orderStatus === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {o.orderStatus}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td className="py-5 text-center text-gray-500" colSpan={3}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
