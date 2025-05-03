import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inventory from './Inventory';
import Employees from './Employees';
import './App.css';
import { useState } from 'react';

function App() {
  const [shoes, setShoes] = useState([]);
  const [apparel, setApparel] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockSummary, setStockSummary] = useState([]);

  const fetchCategory = async (category, setter) => {
    setActiveCategory(category);
    const url = new URL(`http://localhost:3000/${category}`);
    if (maxPrice) url.searchParams.append('maxPrice', maxPrice);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setter(data);
      } else {
        console.error(`Failed to fetch ${category}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  };

  const fetchStockSummary = async () => {
    try {
      const response = await fetch('http://localhost:3000/summary/stock');
      if (response.ok) {
        const data = await response.json();
        setStockSummary(data);
      } else {
        console.error('Failed to fetch stock summary:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching stock summary:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-title-container">
            <Link to="/" className="header-title">Roy's Sporting Center</Link>
          </div>
          <div className="header-right">
            <Link to="/inventory" className="login-button">Inventory</Link>
            <Link to="/employees" className="login-button">Employees</Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <section className="welcome-area">
                  <div className="welcome-stock-container">
                    <div className="welcome-section">
                      <h2 className="welcome-title">Welcome to Roy's!</h2>
                      <p className="welcome-subtitle">
                        Since our founding, we have been the place to find good stuff at prices much steeper than most!
                      </p>

                      <div className="price-filter">
                        <label htmlFor="maxPrice">Max Price: </label>
                        <input
                          id="maxPrice"
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          placeholder="e.g. 50"
                        />
                      </div>

                      <div className="dropdown">
                        <button className="dropbtn">Categories</button>
                        <div className="dropdown-content">
                          <button onClick={() => fetchCategory('shoes', setShoes)}>Shoes</button>
                          <button onClick={() => fetchCategory('apparel', setApparel)}>Apparel</button>
                          <button onClick={() => fetchCategory('equipment', setEquipment)}>Equipment</button>
                        </div>
                      </div>
                    </div>

                    <div className="stock-summary">
                      <button className="primary-button" onClick={fetchStockSummary}>
                        Show Total Stock by Category
                      </button>
                      {stockSummary.length > 0 && (
                        <div className="table-wrapper">
                          <table className="inventory-table">
                            <thead>
                              <tr>
                                <th>Category</th>
                                <th>Total Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stockSummary.map((row, i) => (
                                <tr key={i}>
                                  <td>{row.category}</td>
                                  <td>{row.total_stock}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                  {activeCategory === 'shoes' && (
                    <CategoryTable
                      title="Shoes"
                      data={shoes}
                      columns={['Style', 'Brand', 'Color', 'Price', 'Stock', 'Age', 'Size']}
                    />
                  )}
                  {activeCategory === 'apparel' && (
                    <CategoryTable
                      title="Apparel"
                      data={apparel}
                      columns={['Type', 'Brand', 'Color', 'Size', 'Price', 'Stock', 'Gender']}
                    />
                  )}
                  {activeCategory === 'equipment' && (
                    <CategoryTable
                      title="Equipment"
                      data={equipment}
                      columns={['Item', 'Sport', 'Price', 'Stock', 'Age Range', 'Brand']}
                    />
                  )}
                </section>
              }
            />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function CategoryTable({ title, data, columns }) {
  return (
    <section className="category-content">
      <h3 className="section-header">{title}</h3>
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>{columns.map((col, i) => <th key={i}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                {columns.map((col, j) => {
                  const key = col.toLowerCase().replace(/ /g, '_');
                  const value = item[key];
                  return (
                    <td key={j}>
                      {col.toLowerCase() === 'price' ? `$${value}` : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default App;
