'use client'
import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import './Navbar.css';

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <nav className="navbar">
      <div className="breadcrumb">
        Home {'>>'} <span>Dashboard V2</span>
      </div>
      <div className="right-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search anything..."
            className="input"
            value={searchTerm}
            onChange={handleSearch}
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