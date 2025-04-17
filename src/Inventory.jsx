import React, { useState } from 'react';
import './Inventory.css'; // Import the Inventory-specific styles

const Inventory = () => {
  const [category, setCategory] = useState('shoes'); // Default to "shoes"

  const handleAdd = async () => {
    let enteredId = prompt('Enter the ID:');
    let enteredName, enteredSize, enteredType, enteredSport;

    if (category === 'shoes') {
      enteredName = prompt('Enter the Name:');
      enteredSize = prompt('Enter the Size:');
      if (!enteredId || !enteredName || !enteredSize) {
        alert('All fields are required!');
        return;
      }
    } else if (category === 'equipment') {
      enteredType = prompt('Enter the Type:');
      enteredSport = prompt('Enter the Sport:');
      if (!enteredId || !enteredType || !enteredSport) {
        alert('All fields are required!');
        return;
      }
    }

    try {
      const endpoint = category === 'shoes' ? '/shoes' : '/equipment'; // Adjust endpoint based on category
      const body =
        category === 'shoes'
          ? { id: enteredId, name: enteredName, size: enteredSize }
          : { id: enteredId, type: enteredType, sport: enteredSport };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result); // Log the server response
        alert(`${category.charAt(0).toUpperCase() + category.slice(1)} added successfully!`);
      } else {
        const errorText = await response.text();
        console.error(`Error adding ${category}:`, errorText);
        alert(`Failed to add ${category}: ${errorText}`);
      }
    } catch (error) {
      console.error(`Error adding ${category}:`, error);
      alert(`Failed to add ${category}. Please try again.`);
    }
  };

  const handleRemove = () => {
    alert('Remove functionality not implemented yet.');
  };

  const handleDropdownChange = (event) => {
    if (event.target.value === 'add') {
      handleAdd();
    } else if (event.target.value === 'remove') {
      handleRemove();
    }
  };

  return (
    <div className="inventory-container">
      <div>
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="shoes">Shoes</option>
          <option value="equipment">Equipment</option>
        </select>
      </div>
      <div className="inventory-sections">
        <section id="equipment">
          <div className="section-header-container">
            <h2 className="section-header">Equipment</h2>
            <div style={{ position: 'relative' }}>
              <select className="dropdown-menu" onChange={handleDropdownChange} defaultValue="">
                <option value="" disabled>
                  Select Action
                </option>
                <option value="add">Add</option>
                <option value="remove">Remove</option>
              </select>
            </div>
          </div>
          <p>
            This section contains all the equipment-related items. Add your content here.
          </p>
        </section>
        <section id="apparel">
          <h2 className="section-header">Apparel</h2>
          <p>
            This section contains all the apparel-related items. Add your content here.
          </p>
        </section>
        <section id="shoes">
          <h2 className="section-header">Shoes</h2>
          <p>
            This section contains all the shoe-related items. Add your content here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Inventory;