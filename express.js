const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Catch-all route for 404 page
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
