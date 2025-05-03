import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Inventory from './Inventory';
import Employees from './Employees';
import './App.css';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shoes, setShoes] = useState([]); 
  const [apparel, setApparel] = useState([]); 
  const [equipment, setEquipment] = useState([]);
  const [activeCategory, setActiveCategory] = useState(''); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchShoes = async () => {
    setApparel([]); 
    setEquipment([]); 
    setActiveCategory('shoes');

    try {
      const response = await fetch('http://localhost:3000/shoes');
      if (response.ok) {
        const data = await response.json();
        setShoes(data); 
      } else {
        console.error('Failed to fetch shoes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };

  const fetchApparel = async () => {
    setShoes([]); 
    setEquipment([]); 
    setActiveCategory('apparel'); 

    try {
      const response = await fetch('http://localhost:3000/apparel');
      if (response.ok) {
        const data = await response.json();
        setApparel(data); 
      } else {
        console.error('Failed to fetch apparel:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching apparel:', error);
    }
  };

  const fetchEquipment = async () => {
    setShoes([]); 
    setApparel([]); 
    setActiveCategory('equipment'); 

    try {
      const response = await fetch('http://localhost:3000/equipment');
      if (response.ok) {
        const data = await response.json();
        setEquipment(data); 
      } else {
        console.error('Failed to fetch equipment:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">

          <div className="header-title-container">
            <Link to="/" className="header-title" onClick={() => setMenuOpen(false)}>
              Roy's Sporting Center
            </Link>
          </div>
          <div className="header-right">
            <Link to="/inventory" className="login-button">
              Inventory
            </Link>
            <Link to="/Employees" className="login-button">
              Employees
            </Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <section className="welcome-section">
                    <h2 className="welcome-title">Welcome to Roy's!</h2>
                    <p className="welcome-subtitle">
                      Since our founding, we have been the place to find good stuff at prices much steeper than most!
                    </p>
                    <div className="dropdown">
                      <button className="dropbtn">Categories</button>
                      <div className="dropdown-content">
                        <button onClick={fetchShoes}>Shoes</button>
                        <button onClick={fetchApparel}>Apparel</button>
                        <button onClick={fetchEquipment}>Equipment</button>
                      </div>
                    </div>
                  </section>

                  {activeCategory === 'shoes' && (
                    <div className="category-content">
                      <h3>Shoes</h3>
                      <ul>
                        {shoes.map((shoe) => (
                          <li key={shoe.id}>
                            {shoe.style} - {shoe.brand} - ${shoe.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeCategory === 'apparel' && (
                    <div className="category-content">
                      <h3>Apparel</h3>
                      <ul>
                        {apparel.map((item) => (
                          <li key={item.id}>
                            {item.type} - {item.brand} - ${item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeCategory === 'equipment' && (
                    <div className="category-content">
                      <h3>Equipment</h3>
                      <ul>
                        {equipment.map((item) => (
                          <li key={item.id}>
                            {item.item} - {item.sport} - ${item.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
