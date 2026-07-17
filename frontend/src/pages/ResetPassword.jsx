import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/login");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Registered Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="New Password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

          <div className="password-box">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

          <button type="submit">
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;