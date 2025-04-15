import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Login from './Login'; // Import the Login component
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
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
          
        </header>

        <main>
        <div class="dropdown">
          <button class="dropbtn">Dropdown</button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Sporting Goods Discount Store</h1>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contacts</Link>
        </nav>
        <div className="login-container">
          <p>
            Are you an employee? <a href="login.html">Login Here</a>
          </p>
        </div>
        <main>

          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <h2>Welcome to Roy's!</h2>
                  <p>
                    Since our founding, we have been the place to find good stuff at prices much steeper than most!

                <section style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Welcome to Our Store</h2>
                  <p>
                    Discover the best deals on sporting goods and equipment. Shop now and save big!
                  </p>
                </section>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> {/* Add route for Login */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
