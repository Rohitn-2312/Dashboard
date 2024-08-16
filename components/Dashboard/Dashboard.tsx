// Dashboard.tsx

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

  const initialDemoCards = {
    "CSPM Executive Dashboard": [
      { 
        id: 'demo1_cspm',
        title: 'Demo Card 1 CSPM', 
        description: 'This is a demo card for CSPM Executive Dashboard', 
        image: 'https://via.placeholder.com/150'
      },
      { 
        id: 'demo2_cspm',
        title: 'Demo Card 2 CSPM', 
        description: 'This is another demo card for CSPM Executive Dashboard', 
        image: 'https://via.placeholder.com/150'
      }
    ],
    "CWPP Dashboard": [
      { 
        id: 'demo1_cwpp',
        title: 'Demo Card 1 CWPP', 
        description: 'This is a demo card for CWPP Dashboard', 
        image: 'https://via.placeholder.com/150'
      },
      { 
        id: 'demo2_cwpp',
        title: 'Demo Card 2 CWPP', 
        description: 'This is another demo card for CWPP Dashboard', 
        image: 'https://via.placeholder.com/150'
      }
    ]
  };

  const [cards, setCards] = useState<{
    [key: string]: { id: string; title: string; description: string; image: string; }[];
  }>({
    "CSPM Executive Dashboard": [...initialDemoCards["CSPM Executive Dashboard"]],
    "CWPP Dashboard": [...initialDemoCards["CWPP Dashboard"]]
  });

  const handleAddWidget = (category: string, widget: { id: string; title: string; description: string; image: string; }) => {
    setCards(prevCards => ({
      ...prevCards,
      [category]: [...prevCards[category], { ...widget, id: Date.now().toString() }]
    }));
    setShowSidebar(false);
  };

  const handleDeleteCard = (category: string, id: string) => {
    setCards(prevCards => ({
      ...prevCards,
      [category]: prevCards[category].filter(card => card.id !== id)
    }));
  };

  const openSidebarForCategory = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    setShowSidebar(true);
  };

  return (
    <div className="dashboard-container">
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
        <div key={category} className="card-list-container">
          <h5 className='card-heading'>{category}</h5>
          <CardList 
            category={category} 
            cards={cards[category]} 
            onAddWidget={() => openSidebarForCategory(category)}
            onDeleteCard={(id) => handleDeleteCard(category, id)}
          />
        </div>
      ))}
      {showSidebar && (
        <AddWidgetSidebar 
        categories={categories}
        selectedCategory={selectedCategory}
        onClose={() => setShowSidebar(false)}
        onAddWidget={(category, newCard) => handleAddWidget(category, { ...newCard, id: Date.now().toString() })}
      />
      )}
    </div>
  );
};

export default Dashboard;