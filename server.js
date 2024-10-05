const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// PostgreSQL connection setup using environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from .env file
    ssl: {
        rejectUnauthorized: false, // Required for some cloud-hosted PostgreSQL services
    },
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get companies from the database
app.get('/companies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM companies');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving companies from the database');
    }
});

// Fallback route to serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
