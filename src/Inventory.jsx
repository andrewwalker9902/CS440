import React, { useState } from 'react';
import './Inventory.css'; // Import the Inventory-specific styles

const Inventory = () => {
  const [type, setType] = useState('');
  const [sport, setSport] = useState('');

  const handleAdd = () => {
    const enteredType = prompt('Enter the Type:');
    const enteredSport = prompt('Enter the Sport:');
    if (enteredType && enteredSport) {
      setType(enteredType);
      setSport(enteredSport);
      console.log('Type:', enteredType, 'Sport:', enteredSport); // Debugging output
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