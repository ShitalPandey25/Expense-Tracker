import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";


function Register(){

  const navigate = useNavigate();
  const [user,setUser] = useState({

    name:"",
    email:"",
    password:"",

  });

  const [showPassword,setShowPassword] = useState(false);
  const handleChange = (e)=>{

    setUser({

      ...user,

      [e.target.name]:e.target.value,

    });

  };

  const handleRegister = async(e)=>{

    e.preventDefault();
    if(user.name.trim().length < 3){

      alert("Name must be at least 3 characters.");

      return;

    }
    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(user.email)){

      alert("Please enter a valid email address.");

      return;

    }
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
    if(!passwordRegex.test(user.password)){
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*()_+-=[]{}|;:',.<>/?)."
      );
      return;
    }
    try{
      const response = await fetch(

      `${import.meta.env.VITE_API_URL}/api/auth/register`,

        {

          method:"POST",


          headers:{

            "Content-Type":"application/json",

          },


          body:JSON.stringify(user),

        }

      );
      const data = await response.json();
      if(response.ok){
        alert(data.message);
        setUser({

          name:"",
          email:"",
          password:"",

        });

        navigate("/login");
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
  return(

    <div className="register-container">

 <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

      <div className="register-card">
        <h1>
          Expense Tracker
        </h1>
        <h2>
          Register
        </h2>
        <form

          onSubmit={handleRegister}

          autoComplete="off"

        >
          <input

            type="text"

            name="name"

            placeholder="Enter Full Name"

            value={user.name}

            onChange={handleChange}

            autoComplete="off"

            required

          />
          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            value={user.email}

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


              value={user.password}


              onChange={handleChange}


              autoComplete="new-password"


              required


            />
            <span
              className="eye-icon"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {
                showPassword
                ? <FaEyeSlash/>
                : <FaEye/>
              }
            </span>
          </div>

          <button type="submit">

            Register

          </button>

        </form>


        <p>

          Already have an account?


          <Link to="/login">
             Login
          </Link>


        </p>
      </div>
    </div>

  );

}

export default Register;