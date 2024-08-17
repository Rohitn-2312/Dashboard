// Navbar.tsx
'use client'
import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import './Navbar.css';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
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