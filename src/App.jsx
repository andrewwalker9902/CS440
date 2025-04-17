import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Login from './Login';
import Inventory from './Inventory';
import './App.css';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
          <div className="header-title-container">
            <Link to="/" className="header-title" onClick={() => setMenuOpen(false)}>
              Roy's Sporting Center
            </Link>
          </div>
          <div className="header-right">
            <Link to="/inventory" className="login-button">
              Inventory
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
        </header>

        <main>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <h2>Welcome to Roy's!</h2>
                  <p>
                    Since our founding, we have been the place to find good stuff at prices much steeper than most!
                  </p>
                </section>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
