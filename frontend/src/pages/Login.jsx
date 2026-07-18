import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

  };



  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify(loginData),
        }
      );


      const data = await response.json();



      if(response.ok){

        alert(data.message);


        localStorage.setItem(
          "token",
          data.token
        );


        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(data.user)
        );


        navigate("/dashboard");

      }
      else{

        alert(data.message);

      }


    }
    catch(error){

      console.error(error);

      alert("Server Error");

    }

  };



  return (

    <div className="login-container">


      <div className="login-card">


        <h1>Expense Tracker</h1>


        <h2>Login</h2>



        <form 
          onSubmit={handleLogin}
          autoComplete="off"
        >



          <input

            type="email"

            name="email"

            placeholder="Enter Registered Email"

            value={loginData.email}

            onChange={handleChange}

            autoComplete="off"

            required

          />



          <div className="password-box">


            <input

              type={
                showPassword 
                ? "text" 
                : "password"
              }

              name="password"

              placeholder="Enter Password"

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

              {
                showPassword 
                ? <FaEyeSlash/> 
                : <FaEye/>
              }


            </span>


          </div>



          <div className="forgot-password">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>



          <button type="submit">
            Login
          </button>



        </form>



        <p>

          Don't have an account?

          <Link to="/register">
             Register
          </Link>


        </p>



      </div>


    </div>

  );

}


export default Login;