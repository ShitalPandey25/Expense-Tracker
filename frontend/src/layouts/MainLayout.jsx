import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";


function MainLayout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <div className="layout-container">
        <Sidebar />

        <main className="main-content">
          {children}
        </main>
      </div>

      <footer className="footer">
        © 2026 Expense Tracker
      </footer>
    </div>
  );
}

export default MainLayout;