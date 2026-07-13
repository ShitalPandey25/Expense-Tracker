import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Expense Tracker</h1>
        <h2>Login</h2>

        <form>

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

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