import React, { useState, useRef, useEffect } from 'react';
import './CardList.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const cardListRef = useRef<HTMLDivElement>(null);

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

  const checkScrollButtons = () => {
    if (cardListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardListRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (cardListRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      cardListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="card-list-container">
      {showLeftButton && (
        <button className="scroll-button left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
      )}
      <div className="card-list" ref={cardListRef} onScroll={checkScrollButtons}>
        {allCards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} />
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
        <div className="card add-card" onClick={onAddWidget}>
          <p>+ Add Widget</p>
        </div>
      </div>
      {showRightButton && (
        <button className="scroll-button right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default CardList;