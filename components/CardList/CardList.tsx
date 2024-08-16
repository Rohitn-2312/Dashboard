import React from 'react';
import './CardList.css';

interface Card {
  title: string;
  description: string;
  image: string;
}

interface CardListProps {
  category: string;
  cards: Card[];
  onAddWidget: () => void;
}

const CardList: React.FC<CardListProps> = ({ category, cards, onAddWidget }) => {
  // Demo cards
  const demoCards: Card[] = [
    { 
      title: 'Demo Card 1', 
      description: 'This is a demo card for ' + category, 
      image: 'https://via.placeholder.com/150'
    },
    { 
      title: 'Demo Card 2', 
      description: 'This is another demo card for ' + category, 
      image: 'https://via.placeholder.com/150'
    }
  ];

  const allCards = [...demoCards, ...cards];

  return (
    <div className="card-list">
      {allCards.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.image} alt={card.title} />
          <div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
      <div className="card add-card" onClick={onAddWidget}>
        <p>+ Add Widget</p>
      </div>
    </div>
  );
};

export default CardList;