'use client'
import React, { useState, useEffect } from 'react';
import './AddWidgetSidebar.css';
import { FaTrash, FaTimes, FaPlus } from 'react-icons/fa';

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
        <div className="sidebar-header">
          <h2>Add Widget</h2>
          <button className="close-button" onClick={onClose}><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="widgetTitle">Widget Title</label>
            <input
              id="widgetTitle"
              type="text"
              placeholder="Enter widget title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="widgetDescription">Widget Description</label>
            <textarea
              id="widgetDescription"
              placeholder="Enter widget description"
              value={widgetDescription}
              onChange={(e) => setWidgetDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="widgetImage">Widget Image URL (optional)</label>
            <input
              id="widgetImage"
              type="text"
              placeholder="Enter image URL"
              value={widgetImage}
              onChange={(e) => setWidgetImage(e.target.value)}
            />
          </div>
          <button type="submit" className="create-widget-button">Create Widget</button>
        </form>
        <div className="category-management">
          <h3>Manage Categories</h3>
          <button className="add-category-button" onClick={() => setShowNewCategoryInput(true)}>
            <FaPlus /> Add New Category
          </button>
          {showNewCategoryInput && (
            <div className="new-category-input">
              <input
                type="text"
                placeholder="New Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={handleAddCategory}>Create</button>
            </div>
          )}
          <div className="category-list">
            {allCategories.map(cat => (
              <div key={cat} className="category-item">
                <input
                  type="checkbox"
                  checked={visibleCategories.includes(cat)}
                  onChange={(e) => onToggleCategory(cat, e.target.checked)}
                  id={`category-${cat}`}
                />
                <label htmlFor={`category-${cat}`}>{cat}</label>
                <button onClick={() => onDeleteCategory(cat)} className="delete-category">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;