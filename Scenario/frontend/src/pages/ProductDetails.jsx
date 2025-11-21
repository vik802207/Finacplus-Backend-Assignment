import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i) => i.product._id === product._id);
    if (existing) existing.qty++;
    else cart.push({ product, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    nav("/cart");
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 p-6 bg-gray-100 min-h-screen">

      {/* LEFT: Product Details */}
      <div className="bg-white shadow rounded-xl p-6">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/600x400"}
          className="w-full h-[420px] object-cover rounded-lg mb-5"
        />
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>

        <p className="text-gray-700 leading-relaxed mb-3">{product.description}</p>

        <div className="text-gray-800 space-y-2">
          <p><span className="font-semibold">Brand:</span> {product.brand}</p>
          <p><span className="font-semibold">Price:</span> ₹{product.price}</p>
        </div>
      </div>

      {/* RIGHT: Buy Card */}
      <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-5">
        <h3 className="text-xl font-semibold mb-4">Buy Now</h3>

        <p className="text-lg mb-2"><span className="font-semibold">Price:</span> ₹{product.price}</p>
        <p className="mb-4">
          <span className="font-semibold">Stock:</span> {product.stock ?? "—"}
        </p>

        <button
          onClick={addToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}
