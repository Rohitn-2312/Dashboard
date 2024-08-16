'use client'
import React, { useState } from 'react';
import './Dashboard.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PiLineVerticalLight } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import CardList from '../CardList/CardList';
import AddWidgetSidebar from '../AddWidgetSidebar/AddWidgetSidebar';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState([
    "CSPM Executive Dashboard",
    "CWPP Dashboard"
  ]);

  const [cards, setCards] = useState<{
    [key: string]: any[];
  }>({
    "CSPM Executive Dashboard": [],
    "CWPP Dashboard": []
  });

  const handleAddWidget = (category: string | number, newCard: any) => {
    setCards(prevCards => ({
      ...prevCards,
      [category]: [...prevCards[category], newCard]
    }));
    setShowSidebar(false);
  };

  const openSidebarForCategory = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    setShowSidebar(true);
  };

  return (
    <div>
      <div className="dashboard">
        <span className="title">CNAPP Dashboard</span>
        <div className='buttons'>
          <button onClick={() => setShowSidebar(true)}>Add Widget +</button>
          <button><TfiReload /></button>
          <button><BsThreeDotsVertical /></button>
          <button><FaClock /><PiLineVerticalLight />Last 2 days <MdKeyboardArrowDown /></button>
        </div>
      </div>
      {categories.map(category => (
        <div key={category}>
          <h5 className='card-heading'>{category}</h5>
          <CardList 
            category={category} 
            cards={cards[category]} 
            onAddWidget={() => openSidebarForCategory(category)}
          />
        </div>
      ))}
      {showSidebar && (
        <AddWidgetSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onClose={() => setShowSidebar(false)}
          onAddWidget={handleAddWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;