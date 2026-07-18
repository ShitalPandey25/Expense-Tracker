import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };


  return (
    <nav className="navbar">

      <h2 className="navbar-title">
        Expense Tracker
      </h2>


      <div className="profile-section">

        <button
          className="profile-btn"
          onClick={() => setShowProfile(!showProfile)}
        >
          <FaUserCircle size={28}/>
          {user?.name}
        </button>


        {showProfile && (
          <div className="profile-dropdown">

            <h4>
              👤 {user?.name}
            </h4>

            <p>
              📧 {user?.email}
            </p>

            <hr/>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;