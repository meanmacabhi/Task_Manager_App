import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
    window.location.reload(); // Ensure auth state updates
  };

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li> {/* ✅ Fix Logout */}
      </ul>
    </nav>
  );
};

export default Navbar;
