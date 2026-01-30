const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static('public')); // ✅ Serve HTML, CSS, JS

// Routes
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Default
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/users', (req, res) => {
  res.sendFile(__dirname + '/public/user.html');
});

// Root route
// app.get('/', (req, res) => {
//   res.send(`Welcome to ${process.env.APP_NAME}`);
// });

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});


/*
  This is the main server file. It:
  - Uses Express for routing
  - Serves static frontend from /public
  - Handles /api/users and /api/todos endpoints
*/

