import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Quiz Master</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
