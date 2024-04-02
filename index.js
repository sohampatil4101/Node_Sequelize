const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: ' ', // Change this to your MySQL host
  user: ' ', // Change this to your MySQL username
  password: ' ', // Change this to your MySQL password
  database: ' ', // Change this to your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) {
    return console.error('Error connecting to MySQL:', error.message);
  }
  console.log('Connected to MySQL!');
});


process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      return console.error('Error closing MySQL connection pool:', err.message);
    }
    console.log('MySQL connection pool closed.');
    process.exit();
  });
});



const express = require('express');
const { Company } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API to send 2 website rows with fields - id and email which are not sent previously
app.get('/api/unverifiedWebsites', async (req, res) => {
    try {
        const unverifiedWebsites = await Company.findAll({
            where: {
                email: null // Assuming unverified websites have null email
            },
            limit: 2,
            attributes: ['id', 'email']
        });
        res.json(unverifiedWebsites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// API to mark the corresponding company email as verified
app.put('/api/verifyEmail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        company.email = req.body.email;
        company.verified = true;
        await company.save();
        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
