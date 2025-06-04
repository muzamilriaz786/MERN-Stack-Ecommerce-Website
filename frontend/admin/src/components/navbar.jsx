import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Admin Dashboard</h1>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/post-perfume">Post-Perfume</Link>
        <Link to="/shopping">Product Edit</Link>
        <Link to="/ProductSlide">ProductSlide</Link>
        <Link to="/ShowTrustBadges">ShowTrustBadges</Link>
        <Link to="/about">About Us</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
