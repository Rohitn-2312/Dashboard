'use client'
import React, { useState } from 'react';
import './CardList.css';

const CardList = () => {
  const [cards, setCards] = useState([
    { title: 'Demo Card 1', description: 'Description 1', image: 'image1.jpg' },
    { title: 'Demo Card 2', description: 'Description 2', image: 'image2.jpg' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '', image: '' });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ title: '', description: '', image: '' });
    setShowForm(false);
  };

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <img src={card.image} alt={card.title} />
        </div>
      ))}
      <div className="card add-card" onClick={() => setShowForm(true)}>
        <h3>Add Widget</h3>
      </div>
      {showForm && (
        <div className="add-card-form active">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newCard.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newCard.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newCard.image}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddCard}>Add Card</button>
        </div>
      )}
    </div>
  );
};

export default CardList;