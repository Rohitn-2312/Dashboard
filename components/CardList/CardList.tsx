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
  const cardListRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    if (showForm) {
      if (newCard.title.trim() && newCard.description.trim() && newCard.image.trim()) {
        setCards([...cards, newCard]);
        setNewCard({ title: '', description: '', image: '' });
        setShowForm(false);
        checkScrollPosition();
      } else {
        // If form fields are empty, do not hide the form
        alert("Please fill in all fields.");
      }
    } else {
      setShowForm(true);
    }
  };

  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    checkScrollPosition();
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewCard({ title: '', description: '', image: '' });
  };

  const scrollLeft = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (cardListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardListRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, [cards]);

  return (
    <div className="card-list-container">
      <div className="card-list" ref={cardListRef} onScroll={checkScrollPosition}>
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} />
            <div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button className="card-delete-button" onClick={() => handleDeleteCard(index)}>Delete</button>
            </div>
          </div>
        ))}
        <div className="card add-card" onClick={handleAddCard}>
          <h3>{showForm ? 'Cancel' : 'Add Widget'}</h3>
        </div>
      </div>
      {!isAtStart && <button className="carousel-button left" onClick={scrollLeft}>{"<"}</button>}
      {!isAtEnd && <button className="carousel-button right" onClick={scrollRight}>{">"}</button>}
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
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CardList;
