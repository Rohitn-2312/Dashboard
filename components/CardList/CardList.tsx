'use client';
import React, { useState, useRef } from 'react';
import './CardList.css';

const CardList = () => {
  const [cards, setCards] = useState([
    { title: 'Demo Card 1', description: 'Description 1', image: 'image1.jpg' },
    { title: 'Demo Card 2', description: 'Description 2', image: 'image2.jpg' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '', image: '' });
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ title: '', description: '', image: '' });
    setShowForm(false);
  };

  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="card-list-container">
      <button className="carousel-button left" onClick={() => scrollCarousel('left')}>
        &lt;
      </button>
      <div className="card-list" ref={carouselRef}>
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} />
            <div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button className="card-delete-button" onClick={() => handleDeleteCard(index)}>
                Delete Card
              </button>
            </div>
          </div>
        ))}
        <div className="card add-card" onClick={() => setShowForm(true)}>
          <h3>Add Widget</h3>
        </div>
      </div>
      <button className="carousel-button right" onClick={() => scrollCarousel('right')}>
        &gt;
      </button>
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
          <button type="button" onClick={handleAddCard}>
            Add Card
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
