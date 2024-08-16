import React, { useState, useEffect } from 'react';
import './AddWidgetSidebar.css';

const AddWidgetSidebar = ({ categories, selectedCategory, onClose, onAddWidget }: { categories: any[], selectedCategory: string, onClose: () => void, onAddWidget: (category: string, widget: { title: string, description: string, image: string }) => void }) => {
  const [category, setCategory] = useState(selectedCategory || '');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [widgetImage, setWidgetImage] = useState('');

  useEffect(() => {
    setCategory(selectedCategory || '');
  }, [selectedCategory]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (category && widgetTitle && widgetDescription) {
      onAddWidget(category, {
        title: widgetTitle,
        description: widgetDescription,
        image: widgetImage || 'https://via.placeholder.com/150'
      });
      onClose();
    }
  };

  return (
    <div className="sidebar-overlay">
      <div className="add-widget-sidebar">
        <h2>Add Widget</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Widget Title"
            value={widgetTitle}
            onChange={(e) => setWidgetTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Widget Description"
            value={widgetDescription}
            onChange={(e) => setWidgetDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Widget Image URL (optional)"
            value={widgetImage}
            onChange={(e) => setWidgetImage(e.target.value)}
          />
          <button type="submit">Create Widget</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;