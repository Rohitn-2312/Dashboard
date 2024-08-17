// AddWidgetSidebar.tsx

import React, { useState, useEffect } from 'react';
import './AddWidgetSidebar.css';
import { FaTrash } from 'react-icons/fa';

interface AddWidgetSidebarProps {
  allCategories: string[];
  visibleCategories: string[];
  selectedCategory: string;
  onClose: () => void;
  onAddWidget: (category: string, widget: { title: string, description: string, image: string }) => void;
  onAddCategory: (category: string) => void;
  onToggleCategory: (category: string, isVisible: boolean) => void;
  onDeleteCategory: (category: string) => void;
}

const AddWidgetSidebar: React.FC<AddWidgetSidebarProps> = ({
  allCategories,
  visibleCategories,
  selectedCategory,
  onClose,
  onAddWidget,
  onAddCategory,
  onToggleCategory,
  onDeleteCategory
}) => {
  const [category, setCategory] = useState(selectedCategory || '');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [widgetImage, setWidgetImage] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    setCategory(selectedCategory || '');
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleAddCategory = () => {
    if (newCategory) {
      onAddCategory(newCategory);
      setNewCategory('');
      setShowNewCategoryInput(false);
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
            {allCategories.map(cat => (
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
        <button type="button" onClick={() => setShowNewCategoryInput(true)}>Add New Category</button>
        {showNewCategoryInput && (
          <div>
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>Create Category</button>
          </div>
        )}
        <h3>Manage Categories</h3>
        {allCategories.map(cat => (
          <div key={cat} className="category-item">
            <input
              type="checkbox"
              checked={visibleCategories.includes(cat)}
              onChange={(e) => onToggleCategory(cat, e.target.checked)}
            />
            <span>{cat}</span>
            <button onClick={() => onDeleteCategory(cat)} className="delete-category">
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;