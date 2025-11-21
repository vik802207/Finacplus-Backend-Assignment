import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const update = (index, qty) => {
    const c = [...cart];
    c[index].qty = qty;
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  };

  const remove = (index) => {
    const c = cart.filter((_, i) => i !== index);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  };

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 p-6 bg-gray-100 min-h-screen">

      {/* Left Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Shopping Cart
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        <div className="flex flex-col gap-4">
          {cart.map((item, idx) => (
            <CartItem
              key={idx}
              item={item}
              onChangeQty={(qty) => update(idx, qty)}
              onRemove={() => remove(idx)}
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <div className="text-lg font-medium mb-4">
          Total: <span className="font-bold">₹{total}</span>
        </div>

        <button
          className={`w-full py-3 rounded-lg text-white font-medium transition 
            ${cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow"
            }`}
          disabled={cart.length === 0}
          onClick={() => nav("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
