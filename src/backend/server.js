import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;


// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root',      // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
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
    console.log("Shoe table: ", results);
    res.json(results);
  });
});


app.get('/equipment', (req, res) => {
  const query = 'SELECT * FROM Equipment';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database.');
      return;
    }
    console.log("Equipment table: ", results);
    res.json(results);
  });
});

app.get('/apparel', (req, res) => {
  const query = 'SELECT * FROM Apparel';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database.');
      return;
    }
    console.log("Apparel table: ", results);
    res.json(results);
  });
});

app.get('/user', (req, res) => {
  const query = 'SELECT * FROM User';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database.');
      return;
    }
    console.log("User table: ", results);
    res.json(results);
  });
});



// Add a route to insert a new shoe
app.post('/shoes', (req, res) => {
  console.log('Request body:', req.body);
  const { id, name, size } = req.body;

  if (!id || !name || !size) {
    return res.status(400).send('Missing required fields: id, name, or size.');
  }

  const query = 'INSERT INTO Shoe (id, name, size) VALUES (?, ?, ?)';

  db.query(query, [id, name, size], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send(`A shoe with ID ${id} already exists.`);
      }
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Shoe added successfully.');
  });
});

// Add a route to insert a new equipment item
app.post('/equipment', (req, res) => {
  console.log('Request body:', req.body);
  const { id, type, sport } = req.body;

  if (!id || !type || !sport) {
    return res.status(400).send('Missing required fields: id, type, or sport.');
  }

  const query = 'INSERT INTO Equipment (id, type, sport) VALUES (?, ?, ?)';

  db.query(query, [id, type, sport], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send(`An equipment item with ID ${id} already exists.`);
      }
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Equipment added successfully.');
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});