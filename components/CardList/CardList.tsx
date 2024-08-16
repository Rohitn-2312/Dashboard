import React, { useState, useEffect } from 'react';
import './CardList.css';

interface Card {
  title: string;
  description: string;
  image: string;
}

interface CardListProps {
  category: string;
}

const CardList: React.FC<CardListProps> = ({ category }) => {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem(category);
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    const handleAddCard = (e: CustomEvent) => {
      if (e.detail.categoryKey === (category === 'CSPM Executive Dashboard' ? 'cspmCards' : 'cwppCards')) {
        setCards((prevCards) => {
          const updatedCards = [...prevCards, e.detail.newCard];
          localStorage.setItem(category, JSON.stringify(updatedCards));
          return updatedCards;
        });
      }
    };

    window.addEventListener('addCard', handleAddCard as EventListener);

    return () => {
      window.removeEventListener('addCard', handleAddCard as EventListener);
    };
  }, [category]);

  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem(category, JSON.stringify(updatedCards));
  };

  return (
    <div className="card-list">
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
    </div>
  );
};

export default CardList;
