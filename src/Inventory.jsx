import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [apparelData, setApparelData] = useState([]);
  const [shoesData, setShoesData] = useState([]);

  const fetchData = async (category, setter) => {
    try {
      const response = await fetch(`http://localhost:3000/${category}`);
      if (response.ok) {
        const data = await response.json();
        setter(data);
      } else {
        console.error(`Failed to fetch ${category} data`);
      }
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error);
    }
  };

  useEffect(() => {
    fetchData('equipment', setEquipmentData);
    fetchData('apparel', setApparelData);
    fetchData('shoes', setShoesData);
  }, []);

  const refreshCategory = (category) => {
    if (category === 'equipment') fetchData('equipment', setEquipmentData);
    else if (category === 'apparel') fetchData('apparel', setApparelData);
    else if (category === 'shoes') fetchData('shoes', setShoesData);
  };

  const handleAction = async (action, category) => {
    const identifier = prompt(`Enter the unique identifier for ${category} : item (equipment), type (apparel), or style (shoes):`);
    let body = {};

    const prompts = {
      shoes: ['brand', 'color', 'price', 'stock', 'age', 'size'],
      equipment: ['sport', 'price', 'stock', 'age_range', 'brand'],
      apparel: ['brand', 'color', 'size', 'price', 'stock', 'gender']
    };

    if (action === 'add') {
      if (category === 'shoes') {
        body = {
          style: identifier,
          ...Object.fromEntries(prompts.shoes.map((field) => [field, prompt(`Enter ${field}:`)]))
        };
      } else if (category === 'equipment') {
        body = {
          item: identifier,
          ...Object.fromEntries(prompts.equipment.map((field) => [field, prompt(`Enter ${field}:`)]))
        };
      } else if (category === 'apparel') {
        body = {
          type: identifier,
          ...Object.fromEntries(prompts.apparel.map((field) => [field, prompt(`Enter ${field}:`)]))
        };
      }

      const response = await fetch(`http://localhost:3000/${category}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert(`${category} added successfully!`);
        refreshCategory(category);
      } else {
        alert(`Failed to add ${category}`);
      }
    }

    if (action === 'update') {
      body = Object.fromEntries(prompts[category].map((field) => [field, prompt(`Enter new ${field} (blank to skip):`)]));
      const response = await fetch(`http://localhost:3000/${category}/${identifier}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        alert(`${category} updated successfully!`);
        refreshCategory(category);
      } else {
        alert(`Failed to update ${category}`);
      }
    }

    if (action === 'delete') {
      const response = await fetch(`http://localhost:3000/${category}/${identifier}`, {
        method: 'DELETE' });
      if (response.ok) {
        alert(`${category} deleted successfully!`);
        refreshCategory(category);
      } else {
        alert(`Failed to delete ${category}`);
      }
    }
  };

  const renderSection = (title, category, data, columns) => (
    <section id={category}>
      <div className="section-header-container">
        <select
          className="dropdown-header"
          onChange={(e) => {
            const val = e.target.value;
            e.target.selectedIndex = 0; // Reset dropdown
            if (val) handleAction(val, category);
          }}
        >
          <option value="">{title}</option>
          <option value="add">Add</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              {columns.map((col, i) => (<th key={i}>{col}</th>))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                {columns.map((col, j) => {
                  const key = col.toLowerCase().replace(/ /g, '_');
                  const value = item[key] ?? '';
                  const display = col === 'Price' ? `$${value}` : value;
                  return <td key={j}>{display}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  

  return (
    <div className="inventory-container">
      <div className="inventory-sections">
        {renderSection('Equipment', 'equipment', equipmentData, ['Item', 'Sport', 'Price', 'Stock', 'Age Range', 'Brand'])}
        {renderSection('Apparel', 'apparel', apparelData, ['Type', 'Brand', 'Color', 'Size', 'Price', 'Stock', 'Gender'])}
        {renderSection('Shoes', 'shoes', shoesData, ['Style', 'Brand', 'Color', 'Price', 'Stock', 'Age', 'Size'])}
      </div>
    </div>
  );
};

export default Inventory;
