import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: 20 }}>
        <h1>Welcome Admin</h1>
        <p>Use Sidebar to manage products, brands, coupons & orders.</p>
      </div>
    </div>
  );
}
