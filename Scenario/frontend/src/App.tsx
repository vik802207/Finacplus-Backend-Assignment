import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtected>
              <AdminProducts />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminProtected>
              <AdminOrders />
            </AdminProtected>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
