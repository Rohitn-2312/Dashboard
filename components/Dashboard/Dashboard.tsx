'use client'
import React, { useState } from 'react';
import './Dashboard.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PiLineVerticalLight } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import CardList from '../CardList/CardList';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAddWidgetClick = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="dashboard">
        <span className="title">CNAPP Dashboard</span>
        <div className='buttons'>
          <button onClick={handleAddWidgetClick}>Add Widget +</button>
          <button><TfiReload /></button>
          <button><BsThreeDotsVertical /></button>
          <button><FaClock /><PiLineVerticalLight />Last 2 days <MdKeyboardArrowDown /></button>
        </div>
      </div>
      <div>
        <h5 className='card-heading'>CSPM Executive Dashboard</h5>
        <CardList category="CSPM Executive Dashboard" />
      </div>
      <div>
        <h5 className='card-heading'>CWPP Dashboard</h5>
        <CardList category="CWPP Dashboard" />
      </div>
      {showSidebar && (
        <div className="sidebar">
          <button className="close-button" onClick={handleCloseSidebar}>✖</button>
          <h3>Select a Category</h3>
          <button onClick={() => handleCategorySelect('CSPM Executive Dashboard')}>
            CSPM Executive Dashboard
          </button>
          <button onClick={() => handleCategorySelect('CWPP Dashboard')}>
            CWPP Dashboard
          </button>
          {selectedCategory && (
            <div className="form">
              <h4>{selectedCategory}</h4>
              <input type="text" placeholder="Widget Title" id="widget-title" />
              <input type="text" placeholder="Widget Description" id="widget-description" />
              <input type="text" placeholder="Widget Image URL" id="widget-image" />
              <button onClick={() => {
                const title = (document.getElementById('widget-title') as HTMLInputElement).value;
                const description = (document.getElementById('widget-description') as HTMLInputElement).value;
                const image = (document.getElementById('widget-image') as HTMLInputElement).value;
                
                const newCard = { title, description, image };
                const categoryKey = selectedCategory === 'CSPM Executive Dashboard' ? 'cspmCards' : 'cwppCards';
                
                window.dispatchEvent(new CustomEvent('addCard', { detail: { categoryKey, newCard } }));
                handleCloseSidebar();
              }}>
                Create Card
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
