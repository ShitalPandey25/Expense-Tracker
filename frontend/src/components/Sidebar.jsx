import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/expenses">Expenses</NavLink>
        </li>

        <li>
          <NavLink to="/income">Income</NavLink>
        </li>

        <li>
          <NavLink to="/reports">Reports</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
