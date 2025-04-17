import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Login from './Login';
import Inventory from './Inventory';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    let slideIndex = 0;
    const showSlides = () => {
      const slides = document.getElementsByClassName('mySlides');
      const dots = document.getElementsByClassName('dot');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].className += ' active';
      setTimeout(showSlides, 3000); // Change image every 3 seconds
    };
    showSlides();
  }, []);

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
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  {/* Slideshow container */}
                  <div className="slideshow-container">
                    {/* Full-width images with number and caption text */}
                    <div className="mySlides fade">
                      <div className="numbertext">1 / 3</div>
                      <img src="public\lebron.jpg" style={{ width: '100%' }} alt="Slide 1" />
                      <div className="text">Lebron Says: I LOVE ROY'S!</div>
                    </div>

                    <div className="mySlides fade">
                      <div className="numbertext">2 / 3</div>
                      <img src="public\morang.jpg" style={{ width: '100%' }} alt="Slide 2" />
                      <div className="text">JA MORANT: THIS IS THE BEST STORE IVE EVER SHOPPED WITH </div>
                    </div>

                    <div className="mySlides fade">
                      <div className="numbertext">3 / 3</div>
                      <img src="public\dude.png" style={{ width: '100%' }} alt="Slide 3" />
                      <div className="text">Random dude we gave a beer to: ROY'S IS THE BEST SPOT FOR ALL SHOPPING NEEDS!</div>
                    </div>

                    {/* Next and previous buttons */}
                    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
                  </div>
                  <br />

                  {/* The dots/circles */}
                  <div style={{ textAlign: 'center' }}>
                    <span className="dot" onClick={() => currentSlide(1)}></span>
                    <span className="dot" onClick={() => currentSlide(2)}></span>
                    <span className="dot" onClick={() => currentSlide(3)}></span>
                  </div>

                  <h2>Welcome to Roy's!</h2>
                  <p>
                    Since our founding, we have been the place to find good stuff at prices much steeper than most!
                  </p>
                  <div className="dropdown">
                    <button className="dropbtn">Categories</button>
                    <div className="dropdown-content">
                      <a href="#">Shoes</a>
                      <a href="#">Apparel</a>
                      <a href="#">Equipment</a>
                    </div>
                  </div>
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
