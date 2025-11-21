import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }){
  if (!localStorage.getItem("adminToken") && !localStorage.getItem("isAdmin")) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}
