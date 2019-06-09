'use strict';


// Application Dependencies
const express = require('express');
const appRouter = express.Router();
const db = require('./pg.js');

// API Routes
appRouter.get('/', db.getBooks);
appRouter.post('/searches', db.createSearch);
appRouter.get('/searches/new', db.newSearch);
appRouter.get('/books/:id', db.getBook);
appRouter.post('/books', db.createBook);
appRouter.put('/books/:id', db.updateBook);
appRouter.delete('/books/:id', db.deleteBook);

appRouter.get('*', (request, response) => response.status(404).send('This route does not exist'));

module.exports = appRouter;
