'use strict';


// Application Dependencies
const express = require('express');
const app = express.Router();
const db = require('./pg.js');

// API Routes
app.get('/', db.getBooks);
app.post('/searches', db.createSearch);
app.get('/searches/new', db.newSearch);
app.get('/books/:id', db.getBook);
app.post('/books', db.createBook);
app.put('/books/:id', db.updateBook);
app.delete('/books/:id', db.deleteBook);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

module.exports = app;
