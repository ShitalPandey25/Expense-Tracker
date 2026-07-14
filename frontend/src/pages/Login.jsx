import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };


  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];


    const user = users.find(
      (item) =>
        item.email === loginData.email &&
        item.password === loginData.password
    );


    if(user){

      alert("Login Successful");


      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );


      navigate("/dashboard");

    }
    else{
      alert("Invalid Email or Password");
    }

  };


  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Expense Tracker</h1>

        <h2>Login</h2>


        <form onSubmit={handleLogin}>


          <input
            type="email"
            name="email"
            placeholder="Enter Registered Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />


         <div className="password-box">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter Password"
    value={loginData.password}
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

          <button type="submit">
            Login
          </button>


        </form>


        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>


      </div>

    </div>
  );
}

export default Login;