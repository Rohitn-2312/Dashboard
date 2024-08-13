import React from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="breadcrumb">
        Home { `>`} <span>Dashboard V2</span>
      </div>
      <div className="right-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search anything..."
            className="input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="icons">
          <FaBell className="icon" />
          <FaUser className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;