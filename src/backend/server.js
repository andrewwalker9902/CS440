import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;


// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Items'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

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

app.get('/employee', (req, res) => {
  const query = 'SELECT * FROM employee';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database.');
      return;
    }
    console.log("Employee table: ", results);
    res.json(results);
  });
});

// Route to insert a new shoe
app.post('/shoes', (req, res) => {
  console.log('Request body:', req.body);
  const { style, brand, color, price, gender, age, size } = req.body;

  if (!style || !brand || !color || !price || !gender || !age || !size) {
    return res.status(400).send('Missing required fields: style, brand, color, price, gender, age, or size.');
  }

  const query = `
    INSERT INTO Shoe (style, brand, color, price, gender, age, size) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [style, brand, color, price, gender, age, size], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Shoe added successfully.');
  });
});

// Route to insert a new equipment item
app.post('/equipment', (req, res) => {
  console.log('Request body:', req.body);
  const { item, sport, price, stock, age_range, brand } = req.body;

  if (!item || !sport || !price || !stock || !age_range || !brand) {
    return res.status(400).send('Missing required fields: item, sport, price, stock, age_range, or brand.');
  }

  const query = `
    INSERT INTO Equipment (item, sport, price, stock, age_range, brand) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [item, sport, price, stock, age_range, brand], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Equipment added successfully.');
  });
});

// Route to insert a new employee
app.post('/employee', (req, res) => {
  console.log('Request body:', req.body);
  const { email, first_name, last_name, phone } = req.body;

  if (!email || !first_name || !last_name || !phone) {
    return res.status(400).send('Missing required fields: email, first_name, last_name, or phone.');
  }

  const query = `
    INSERT INTO Employee (email, first_name, last_name, phone) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [email, first_name, last_name, phone], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Employee added successfully.');
  });
});

// Route to insert a new apparel item
app.post('/apparel', (req, res) => {
  console.log('Request body:', req.body);
  const { type, brand, color, size, price, stock, gender } = req.body;

  if (!type || !brand || !color || !size || !price || !stock || !gender) {
    return res.status(400).send('Missing required fields: type, brand, color, size, price, stock, or gender.');
  }

  const query = `
    INSERT INTO Apparel (type, brand, color, size, price, stock, gender) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [type, brand, color, size, price, stock, gender], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error inserting into the database.');
    }

    console.log('Insert success:', results);
    res.status(201).send('Apparel added successfully.');
  });
});

// Update a shoe based on the style
app.put('/shoes/:style', (req, res) => {
  console.log('Request body:', req.body);
  const { style } = req.params;
  const { brand, color, price, gender, age, size } = req.body;

  // Build the query dynamically based on provided fields, allowing all fields to be optional
  const fields = [];
  const values = [];

  if (brand) {
    fields.push('brand = ?');
    values.push(brand);
  }
  if (color) {
    fields.push('color = ?');
    values.push(color);
  }
  if (price) {
    fields.push('price = ?');
    values.push(price);
  }
  if (gender) {
    fields.push('gender = ?');
    values.push(gender);
  }
  if (age) {
    fields.push('age = ?');
    values.push(age);
  }
  if (size) {
    fields.push('size = ?');
    values.push(size);
  }

  if (fields.length === 0) {
    return res.status(400).send('No fields provided to update.');
  }

  const query = `
    UPDATE Shoe 
    SET ${fields.join(', ')}
    WHERE style = ?
  `;
  values.push(style);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error updating the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Shoe not found.');
    }

    console.log('Update success:', results);
    res.status(200).send('Shoe updated successfully.');
  });
});

// Update an equipment item based on the item 
app.put('/equipment/:item', (req, res) => {
  console.log('Request body:', req.body);
  const { item } = req.params;
  const { sport, price, stock, age_range, brand } = req.body;

  // Build the query dynamically based on provided fields, allowing all fields to be optional
  const fields = [];
  const values = [];

  if (sport) {
    fields.push('sport = ?');
    values.push(sport);
  }
  if (price) {
    fields.push('price = ?');
    values.push(price);
  }
  if (stock) {
    fields.push('stock = ?');
    values.push(stock);
  }
  if (age_range) {
    fields.push('age_range = ?');
    values.push(age_range);
  }
  if (brand) {
    fields.push('brand = ?');
    values.push(brand);
  }

  if (fields.length === 0) {
    return res.status(400).send('No fields provided to update.');
  }

  const query = `
    UPDATE Equipment 
    SET ${fields.join(', ')}
    WHERE item = ?
  `;
  values.push(item);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error updating the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Equipment item not found.');
    }

    console.log('Update success:', results);
    res.status(200).send('Equipment item updated successfully.');
  });
});

// Update an employee based on the email
app.put('/employee/:email', (req, res) => {
  console.log('Request body:', req.body);
  const { email } = req.params;
  const { first_name, last_name, phone } = req.body;

  // Build the query dynamically based on provided fields, allowing all fields to be optional
  const fields = [];
  const values = [];

  if (first_name) {
    fields.push('first_name = ?');
    values.push(first_name);
  }
  if (last_name) {
    fields.push('last_name = ?');
    values.push(last_name);
  }
  if (phone) {
    fields.push('phone = ?');
    values.push(phone);
  }

  if (fields.length === 0) {
    return res.status(400).send('No fields provided to update.');
  }

  const query = `
    UPDATE Employee 
    SET ${fields.join(', ')}
    WHERE email = ?
  `;
  values.push(email);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error updating the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Employee not found.');
    }

    console.log('Update success:', results);
    res.status(200).send('Employee updated successfully.');
  });
});

// Update an apparel item based on the type
app.put('/apparel/:type', (req, res) => {
  console.log('Request body:', req.body);
  const { type } = req.params;
  const { brand, color, size, price, stock, gender } = req.body;

  // Build the query dynamically based on provided fields, allowing all fields to be optional
  const fields = [];
  const values = [];

  if (brand) {
    fields.push('brand = ?');
    values.push(brand);
  }
  if (color) {
    fields.push('color = ?');
    values.push(color);
  }
  if (size) {
    fields.push('size = ?');
    values.push(size);
  }
  if (price) {
    fields.push('price = ?');
    values.push(price);
  }
  if (stock) {
    fields.push('stock = ?');
    values.push(stock);
  }
  if (gender) {
    fields.push('gender = ?');
    values.push(gender);
  }

  if (fields.length === 0) {
    return res.status(400).send('No fields provided to update.');
  }

  const query = `
    UPDATE Apparel 
    SET ${fields.join(', ')}
    WHERE type = ?
  `;
  values.push(type);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error updating the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Apparel item not found.');
    }

    console.log('Update success:', results);
    res.status(200).send('Apparel item updated successfully.');
  });
});

// Delete a shoe based on the style
app.delete('/shoes/:style', (req, res) => {
  console.log('Request to delete shoe with style:', req.params.style);
  const { style } = req.params;

  const query = `
    DELETE FROM Shoe 
    WHERE style = ?
  `;

  db.query(query, [style], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error deleting the shoe from the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Shoe not found.');
    }

    console.log('Delete success:', results);
    res.status(200).send('Shoe deleted successfully.');
  });
});

// Delete an equipment item based on the item
app.delete('/equipment/:item', (req, res) => {
  console.log('Request to delete equipment with item:', req.params.item);
  const { item } = req.params;

  const query = `
    DELETE FROM Equipment 
    WHERE item = ?
  `;

  db.query(query, [item], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error deleting the equipment item from the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Equipment item not found.');
    }

    console.log('Delete success:', results);
    res.status(200).send('Equipment item deleted successfully.');
  });
});

// Delete an employee based on the email
app.delete('/employee/:email', (req, res) => {
  console.log('Request to delete employee with email:', req.params.email);
  const { email } = req.params;

  const query = `
    DELETE FROM Employee 
    WHERE email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error deleting the employee from the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Employee not found.');
    }

    console.log('Delete success:', results);
    res.status(200).send('Employee deleted successfully.');
  });
});

// Delete an apparel item based on the type
app.delete('/apparel/:type', (req, res) => {
  console.log('Request to delete apparel with type:', req.params.type);
  const { type } = req.params;

  const query = `
    DELETE FROM Apparel 
    WHERE type = ?
  `;

  db.query(query, [type], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error deleting the apparel item from the database.');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Apparel item not found.');
    }

    console.log('Delete success:', results);
    res.status(200).send('Apparel item deleted successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});