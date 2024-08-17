'use client'
import React, { useState, useRef, useEffect } from 'react';
import './CardList.css';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CardListProps {
  category: string;
  cards: Card[];
  onAddWidget: () => void;
  onDeleteCard: (id: string) => void;
}

const CardList: React.FC<CardListProps> = ({ category, cards, onAddWidget, onDeleteCard }) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const cardListRef = useRef<HTMLDivElement>(null);

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
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} />
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <button className="delete-button" onClick={() => onDeleteCard(card.id)}>
              <FaTrash />
            </button>
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