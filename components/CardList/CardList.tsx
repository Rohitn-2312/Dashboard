'use client'
import React, { useState, useRef, useEffect } from 'react';
import './CardList.css';

const CardList = () => {
  const [cards, setCards] = useState([
    { title: 'Demo Card 1', description: 'Description 1', image: 'image1.jpg' },
    { title: 'Demo Card 2', description: 'Description 2', image: 'image2.jpg' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '', image: '' });
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const cardListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleScrollButtons();
  }, [cards]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ title: '', description: '', image: '' });
    setShowForm(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (cardListRef.current) {
      const scrollAmount = direction === 'left' ? -cardListRef.current.clientWidth : cardListRef.current.clientWidth;
      cardListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollButtons = () => {
    if (cardListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardListRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  return (
    <div className="card-list-container">
      {!isAtStart && (
        <button className="carousel-button left" onClick={() => handleScroll('left')}>
          &lt;
        </button>
      )}
      <div className="card-list" ref={cardListRef} onScroll={handleScrollButtons}>
        {cards.map((card, index) => (
          <div className="card-wrapper" key={index}>
            <div className="card">
              <img src={card.image} alt={card.title} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
            <button className="delete-button" onClick={() => setCards(cards.filter((_, i) => i !== index))}>
              Delete Card
            </button>
          </div>
        ))}
        <div className="card-wrapper add-card" onClick={() => setShowForm(true)}>
          <div className="card">
            <h3>Add Widget</h3>
          </div>
        </div>
      </div>
      {!isAtEnd && (
        <button className="carousel-button right" onClick={() => handleScroll('right')}>
          &gt;
        </button>
      )}
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
