import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered, please login");
      nav("/login");
    } catch (e) {
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submit}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}
