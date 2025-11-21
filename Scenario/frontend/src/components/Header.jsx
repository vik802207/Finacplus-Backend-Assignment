import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const isAdmin = localStorage.getItem("isAdmin");
  const isUser = localStorage.getItem("token");

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-400 transition">
            MyShop
          </Link>
          <Link to="/products" className="hover:text-blue-400 transition">
            Products
          </Link>
          <Link to="/cart" className="hover:text-blue-400 transition">
            Cart
          </Link>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          {!isUser && !isAdmin && (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400 transition">
                Register
              </Link>
            </>
          )}

          <Link to="/admin-login" className="hover:text-blue-400 transition">
            Admin
          </Link>

          {(isUser || isAdmin) && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
