import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Expense Tracker</h1>
        <h2>Create Account</h2>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;