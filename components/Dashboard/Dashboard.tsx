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
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allCategories, setAllCategories] = useState([
    "CSPM Executive Dashboard",
    "CWPP Dashboard"
  ]);
  const [visibleCategories, setVisibleCategories] = useState([...allCategories]);
  const [searchTerm, setSearchTerm] = useState('');

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
  }>(initialDemoCards);

  const handleAddWidget = (category: string, widget: { id: string; title: string; description: string; image: string; }) => {
    setCards(prevCards => ({
      ...prevCards,
      [category]: [...(prevCards[category] || []), { ...widget, id: Date.now().toString() }]
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddCategory = (newCategory: string) => {
    setAllCategories(prev => [...prev, newCategory]);
    setVisibleCategories(prev => [...prev, newCategory]);
    setCards(prev => ({ ...prev, [newCategory]: [] }));
  };

  const handleToggleCategory = (category: string, isVisible: boolean) => {
    if (isVisible) {
      setVisibleCategories(prev => [...prev, category]);
    } else {
      setVisibleCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleDeleteCategory = (category: string) => {
    setAllCategories(prev => prev.filter(c => c !== category));
    setVisibleCategories(prev => prev.filter(c => c !== category));
    setCards(prev => {
      const newCards = { ...prev };
      delete newCards[category];
      return newCards;
    });
  };

  const filteredCards = Object.keys(cards).reduce((acc, category) => {
    acc[category] = cards[category].filter(card => 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc;
  }, {} as typeof cards);

  return (
    <div className="dashboard-container">
      <Navbar onSearch={handleSearch}/>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <span className="title">CNAPP Dashboard</span>
          <div className='buttons'>
            <button onClick={() => setShowSidebar(true)}>Add Widget +</button>
            <button><TfiReload /></button>
            <button><BsThreeDotsVertical /></button>
            <button><FaClock /><PiLineVerticalLight />Last 2 days <MdKeyboardArrowDown /></button>
          </div>
        </div>
        {visibleCategories.map(category => (
          <div key={category} className="card-list-container">
            <h5 className='card-heading'>{category}</h5>
            <CardList 
              category={category} 
              cards={filteredCards[category] || []} 
              onAddWidget={() => openSidebarForCategory(category)}
              onDeleteCard={(id) => handleDeleteCard(category, id)}
            />
          </div>
        ))}
        {showSidebar && (
          <AddWidgetSidebar 
            allCategories={allCategories}
            visibleCategories={visibleCategories}
            selectedCategory={selectedCategory}
            onClose={() => setShowSidebar(false)}
            onAddWidget={(category, newCard) => handleAddWidget(category, { ...newCard, id: Date.now().toString() })}
            onAddCategory={handleAddCategory}
            onToggleCategory={handleToggleCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;