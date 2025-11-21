import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/admin/login", { email, password });

      localStorage.setItem("adminToken", res.data.token || res.data);
      localStorage.setItem("isAdmin", "true");

      alert("Admin logged in");
      nav("/admin");
    } catch (e) {
      alert("Admin login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <div className="flex flex-col gap-4">

          <input
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold"
          >
            Login
          </button>

        </div>
      </div>

    </div>
  );
}
