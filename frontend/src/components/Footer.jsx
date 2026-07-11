import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>Expense Tracker</h2>
          <p>Manage your income and expenses easily.</p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/expenses">Expenses</a></li>
            <li><a href="/income">Income</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Expense Tracker | Developed by Shamal
      </div>
    </footer>
  );
}

export default Footer;