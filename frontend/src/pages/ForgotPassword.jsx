import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
     `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    alert(data.message);
    if (response.ok) {
  navigate("/reset-password");
}
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};
  return (
  <div className="forgot-container">
   <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>
    <div className="forgot-card">
      <h1>Forgot Password</h1>

     

      <form onSubmit={handleSubmit}>
        <input
    type="email"
    placeholder="Enter Registered Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <button type="submit">Continue</button>
      </form>

      <Link className="back-link" to="/login">
        Back to Login
      </Link>
    </div>
  </div>
);
}

export default ForgotPassword;