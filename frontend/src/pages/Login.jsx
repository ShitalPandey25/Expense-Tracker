import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(data.user)
        );

        alert(data.message);

        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      {/* Floating Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="login-card">

        <div className="logo-circle">
          💰
        </div>

        <h1>Expense Tracker</h1>

        <p className="welcome">
          Welcome Back 👋
        </p>

        <span className="subtitle">
          Login to continue managing your expenses
        </span>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
        >

          {/* Email */}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Registered Email"
              value={loginData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <div className="bottom-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;