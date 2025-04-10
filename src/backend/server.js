import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: '127.0.0.1', // Replace with your MySQL host
  user: 'root',      // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'Items' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define a route to query all shoes
app.get('/shoes', (req, res) => {
  const query = 'SELECT * FROM Shoe';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database.');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});