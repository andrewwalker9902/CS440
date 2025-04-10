<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
    <header>
        <h1>Sporting Goods Discount Store</h1>
    </header>
    <nav>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
    </nav>
    <div class="login-container">
        <p>Are you an employee? <a href="login.html">Login Here</a></p>
    </div>
</body>
  )
=======
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
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
          <a href="login.html" className="login-button">
            Login
          </a>
        </header>

        <main>
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
          </Routes>
        </main>
      </div>
    </Router>
  );
>>>>>>> Stashed changes
}

export default App
