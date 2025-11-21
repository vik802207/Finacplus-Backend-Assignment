import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [address, setAddress] = useState("");
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const placeOrder = async () => {
    try {
      if (!localStorage.getItem("token")) {
        alert("Login to place order");
        navigate("/login");
        return;
      }

      const body = {
        items: cart.map((i) => ({
          productId: i.product._id,
          quantity: i.qty,
        })),
        totalAmount: total,
        address,
      };

      await api.post("/orders/place", body);
      localStorage.removeItem("cart");
      alert("Order placed");
      navigate("/orders");

    } catch (err) {
      alert("Failed to place order");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 p-6 min-h-screen bg-gray-100">

      {/* Checkout Box */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

        <p className="text-lg font-medium mb-3">
          Total: <span className="font-bold">₹{total}</span>
        </p>

        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>

        <button
          onClick={placeOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          Place Order
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
        <h3 className="text-xl font-semibold mb-3">Summary</h3>

        <p className="text-gray-700">
          Items: <span className="font-bold">{cart.length}</span>
        </p>

        <p className="text-gray-700 mt-1">
          Total: <span className="font-bold">₹{total}</span>
        </p>
      </div>
    </div>
  );
}
