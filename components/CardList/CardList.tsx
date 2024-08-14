'use client'
import React, { useState } from 'react';
import './CardList.css';

interface Card {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

const CardComponent: React.FC<Card> = ({ imageUrl, title, description }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

interface AddCardFormProps {
  onAddCard: (card: Omit<Card, 'id'>) => void;
  onCancel: () => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard({ title, description, imageUrl });
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <button type="submit">Add Card</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'This is the first card',
    },
    {
      id: 2,
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Card 2',
      description: 'This is the second card',
    },
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const addNewCard = (newCardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      id: cards.length + 1,
      ...newCardData,
    };
    setCards([...cards, newCard]);
    setIsAddingCard(false);
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card-list-container">
      <div className="card-list">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`card-wrapper ${index === currentCardIndex ? 'active' : ''}`}
          >
            <CardComponent {...card} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevCard}>&#8249;</button>
      <button className="carousel-button next" onClick={nextCard}>&#8250;</button>
      {isAddingCard ? (
        <AddCardForm onAddCard={addNewCard} onCancel={() => setIsAddingCard(false)} />
      ) : (
        <button className="add-card-button" onClick={() => setIsAddingCard(true)}>Add New Card</button>
      )}
    </div>
  );
};

export default CardList;