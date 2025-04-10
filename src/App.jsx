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

}

export default App;
