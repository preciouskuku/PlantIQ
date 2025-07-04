import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaLeaf } from 'react-icons/fa';
// import logo from '../assets/logo.jpg'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaLeaf className="logo-icon" />
        {/* <img src= {logo} alt="logo" srcset="" /> */}
        <h2 className="logo-text">PlantIQ</h2>
      </div>
      <div className="navbar-center">
        <NavLink to="/">App</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/company">Company</NavLink>
        <NavLink to="/solutions">Solutions</NavLink>
      </div>
      <div className="navbar-right">
        <button className="get-app-btn">Get the App</button>
      </div>
    </nav>
  );
};

export default Navbar;
