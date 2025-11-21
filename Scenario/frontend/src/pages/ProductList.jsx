import React, { useEffect, useState } from "react";
import api from "../../api";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/products"); // backend: GET /api/products
      setProducts(res.data.products || res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
}
