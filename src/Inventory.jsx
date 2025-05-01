import React, { useState } from 'react';
import './Inventory.css'; // Import the Inventory-specific styles

const Inventory = () => {
  const handleAdd = async (category) => {
    let body = {};

    if (category === 'shoes') {
      body = {
        style: prompt('Enter the Style:'),
        brand: prompt('Enter the Brand:'),
        color: prompt('Enter the Color:'),
        price: prompt('Enter the Price:'),
        gender: prompt('Enter the Gender:'),
        age: prompt('Enter the Age:'),
        size: prompt('Enter the Size:'),
      };
    } else if (category === 'equipment') {
      body = {
        item: prompt('Enter the Item:'),
        sport: prompt('Enter the Sport:'),
        price: prompt('Enter the Price:'),
        stock: prompt('Enter the Stock:'),
        age_range: prompt('Enter the Age Range:'),
        brand: prompt('Enter the Brand:'),
      };
    } else if (category === 'apparel') {
      body = {
        type: prompt('Enter the Type:'),
        brand: prompt('Enter the Brand:'),
        color: prompt('Enter the Color:'),
        size: prompt('Enter the Size:'),
        price: prompt('Enter the Price:'),
        stock: prompt('Enter the Stock:'),
        gender: prompt('Enter the Gender:'),
      };
    }

    try {
      const response = await fetch(`http://localhost:3000/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(`${category.charAt(0).toUpperCase() + category.slice(1)} added successfully!`);
      } else {
        const errorText = await response.text();
        alert(`Failed to add ${category}: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error adding ${category}:`, error);
      alert(`Failed to add ${category}. Please try again.`);
    }
  };

  const handleUpdate = async (category) => {
    const identifier = prompt(`Enter the unique identifier for the ${category} to update (e.g., style for shoes, item for equipment, type for apparel):`);
    let body = {};

    if (category === 'shoes') {
      body = {
        brand: prompt('Enter the new Brand (leave blank to skip):'),
        color: prompt('Enter the new Color (leave blank to skip):'),
        price: prompt('Enter the new Price (leave blank to skip):'),
        gender: prompt('Enter the new Gender (leave blank to skip):'),
        age: prompt('Enter the new Age (leave blank to skip):'),
        size: prompt('Enter the new Size (leave blank to skip):'),
      };
    } else if (category === 'equipment') {
      body = {
        sport: prompt('Enter the new Sport (leave blank to skip):'),
        price: prompt('Enter the new Price (leave blank to skip):'),
        stock: prompt('Enter the new Stock (leave blank to skip):'),
        age_range: prompt('Enter the new Age Range (leave blank to skip):'),
        brand: prompt('Enter the new Brand (leave blank to skip):'),
      };
    } else if (category === 'apparel') {
      body = {
        brand: prompt('Enter the new Brand (leave blank to skip):'),
        color: prompt('Enter the new Color (leave blank to skip):'),
        size: prompt('Enter the new Size (leave blank to skip):'),
        price: prompt('Enter the new Price (leave blank to skip):'),
        stock: prompt('Enter the new Stock (leave blank to skip):'),
        gender: prompt('Enter the new Gender (leave blank to skip):'),
      };
    }

    try {
      const response = await fetch(`http://localhost:3000/${category}/${identifier}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(`${category.charAt(0).toUpperCase() + category.slice(1)} updated successfully!`);
      } else {
        const errorText = await response.text();
        alert(`Failed to update ${category}: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error updating ${category}:`, error);
      alert(`Failed to update ${category}. Please try again.`);
    }
  };

  const handleDelete = async (category) => {
    const identifier = prompt(`Enter the unique identifier for the ${category} to delete (e.g., style for shoes, item for equipment, type for apparel):`);

    try {
      const response = await fetch(`http://localhost:3000/${category}/${identifier}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`${category.charAt(0).toUpperCase() + category.slice(1)} deleted successfully!`);
      } else {
        const errorText = await response.text();
        alert(`Failed to delete ${category}: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error deleting ${category}:`, error);
      alert(`Failed to delete ${category}. Please try again.`);
    }
  };

  const handleDropdownChange = (event, category) => {
    const action = event.target.value;
    if (action === 'add') {
      handleAdd(category);
    } else if (action === 'update') {
      handleUpdate(category);
    } else if (action === 'delete') {
      handleDelete(category);
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-sections">
        {/* Equipment Section */}
        <section id="equipment">
          <div className="section-header-container">
            <h2 className="section-header">Equipment</h2>
            <div style={{ position: 'relative' }}>
              <select
                className="dropdown-menu"
                onChange={(e) => handleDropdownChange(e, 'equipment')}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Action
                </option>
                <option value="add">Add</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
          <p>
            This section contains all the equipment-related items. Add your content here.
          </p>
        </section>

        {/* Apparel Section */}
        <section id="apparel">
          <div className="section-header-container">
            <h2 className="section-header">Apparel</h2>
            <div style={{ position: 'relative' }}>
              <select
                className="dropdown-menu"
                onChange={(e) => handleDropdownChange(e, 'apparel')}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Action
                </option>
                <option value="add">Add</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
          <p>
            This section contains all the apparel-related items. Add your content here.
          </p>
        </section>

        {/* Shoes Section */}
        <section id="shoes">
          <div className="section-header-container">
            <h2 className="section-header">Shoes</h2>
            <div style={{ position: 'relative' }}>
              <select
                className="dropdown-menu"
                onChange={(e) => handleDropdownChange(e, 'shoes')}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Action
                </option>
                <option value="add">Add</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
          <p>
            This section contains all the shoe-related items. Add your content here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Inventory;