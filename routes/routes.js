'use strict';


// Application Dependencies
const express = require('express');
const appRouter = express.Router();
let db;

const args = process.argv.slice(2);
console.log(args);

if(args[0] === 'mongo'){
  db = require('../db/mongo.js');
  console.log('in mongo');
}else{
  db = require('../db/pg.js');
  console.log('in pg');
}

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
