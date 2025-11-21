import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");

  const fetchCoupons = async () => {
    const res = await api.get("/coupons");
    setCoupons(res.data);
  };

  const addCoupon = async () => {
    await api.post("/admin/coupon", { code });
    setCode("");
    fetchCoupons();
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4">Coupons</h2>

        {/* Add Coupon Box */}
        <div className="flex gap-2 mb-5">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="px-4 py-2 border rounded-lg w-64 focus:ring focus:ring-blue-300 outline-none"
          />

          <button
            onClick={addCoupon}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            Add Coupon
          </button>
        </div>

        {/* Coupons List */}
        <div className="bg-white rounded-lg shadow p-4">
          {coupons.length === 0 ? (
            <p className="text-gray-500">No coupons yet</p>
          ) : (
            <ul className="space-y-2">
              {coupons.map((c) => (
                <li
                  key={c._id}
                  className="px-4 py-2 border rounded-lg bg-gray-50 flex justify-between"
                >
                  <span className="font-medium">{c.code}</span>
                  <span className="text-sm text-gray-500">ID: {c._id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
