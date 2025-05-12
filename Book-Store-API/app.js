const express = require('express');
const app = express();
const bookRouter = require('./routes/book_routes');

// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API');
});

// Routes
app.use('/api/v1', bookRouter);


module.exports = app;