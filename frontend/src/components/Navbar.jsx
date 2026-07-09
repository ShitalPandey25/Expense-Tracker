import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="navbar-title">
        Expense Tracker
      </h2>


      <ul className="navbar-menu">

        <li>Dashboard</li>
        <li>Income</li>
        <li>Expense</li>
        <li>Reports</li>

      </ul>

    </nav>
  );
}

export default Navbar;