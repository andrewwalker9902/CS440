import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
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
          <Link to="/contact">Contact</Link>
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
                <section style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Welcome to Our Store</h2>
                  <p>
                    Discover the best deals on sporting goods and equipment. Shop now and save big!
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
