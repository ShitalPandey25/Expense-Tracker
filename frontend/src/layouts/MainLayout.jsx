import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";
import { Outlet } from "react-router-dom";


function MainLayout() {

  return (
    <div className="layout">

      <Navbar />

      <div className="layout-container">

        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

      <footer className="footer">
        © 2026 Expense Tracker
      </footer>

    </div>
  );
}

export default MainLayout;