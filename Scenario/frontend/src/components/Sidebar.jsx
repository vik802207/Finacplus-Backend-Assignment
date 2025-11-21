import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-6 flex flex-col gap-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Admin</h2>
      <div className="h-px bg-gray-700 mb-4"></div>

      <Link
        to="/admin"
        className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
      >
        Dashboard
      </Link>

      <Link
        to="/products"
        className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
      >
        Products
      </Link>

      <Link
        to="/brands"
        className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
      >
        Brands
      </Link>

      <Link
        to="/coupons"
        className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
      >
        Coupons
      </Link>

      <Link
        to="/orders"
        className="py-2 px-3 rounded-lg hover:bg-gray-700 transition"
      >
        Orders
      </Link>
    </div>
  );
}
