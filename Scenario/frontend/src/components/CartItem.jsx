import React from "react";

export default function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border">
      <img
        src={item.product.image || "https://via.placeholder.com/80"}
        className="w-20 h-20 object-cover rounded-lg"
        alt="product"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.product.title}</h3>

        <p className="text-gray-600">
          ₹{item.product.price} × {item.qty}
          <span className="font-semibold text-gray-900 ml-1">
            = ₹{item.product.price * item.qty}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-end">
        <input
          type="number"
          min={1}
          value={item.qty}
          onChange={(e) => onChangeQty(Number(e.target.value))}
          className="w-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={onRemove}
          className="mt-3 bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
