'use strict';

// Application Dependencies
const superagent = require('superagent');
const express = require('express');
const appRouter = express.Router();
const books = require('../models/books.js');
const bookshelves = require('../models/bookshelves.js');

// Database Setup
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

// API Routes
appRouter.get('/', getBooks);
appRouter.post('/searches', createSearch);
appRouter.get('/searches/new', newSearch);
appRouter.get('/books/:id', getBook);
appRouter.post('/books', createBook);
appRouter.put('/books/:id', updateBook);
appRouter.delete('/books/:id', deleteBook);
// const book = new Book();

// const bookshelves = require('./data/mongo/bookshelves-model.js');
// const bookshelf = new Bookshelves();

// Prepare the express app
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// HELPER FUNCTIONS
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title ? info.title : 'No title available';
  this.author = info.authors ? info.authors[0] : 'No author available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description ? info.description : 'No description available';
}


function createBook(request, response, next){
  book.post(request.body)
    .then(response.redirect('/'))
    .catch( next );
}

function getBooks(request, response, next) {
  book.find({})
    .then( data => {
      if(data.length){
        response.render('pages/index', {books: data});
      }else{
        response.render('pages/searches/new');
      }
    })
    .catch( next );
}

function getBook(request, response, next) {
  let id = [request.params.id];
  book.get(id)
    .then(data => {
      response.render('pages/books/show', {book: data[0], bookshelves: data})
    })
    .catch( next );
}

function updateBook(request, response, next){
  book.findByIdAndUpdate(request.params.id, request.body)
    .then(response.redirect(`books/${request.params.id}`))
    .catch( next );
}

function deleteBook(request, response, next){
  let id = [request.params.id];
  book.delete(id)
    .then(response.redirect('/'))
    .catch( next );
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { results: results }))
    .catch(err => handleError(err, response));
}

// function getBookshelves() {
//   // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
//   let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';

//   return client.query(SQL);
// }

// function createShelf(shelf) {
//   let normalizedShelf = shelf.toLowerCase();
//   let SQL1 = `SELECT id from bookshelves where name=$1;`;
//   let values1 = [normalizedShelf];

//   return client.query(SQL1, values1)
//     .then(results => {
//       if (results.rowCount) {
//         return results.rows[0].id;
//       } else {
//         let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
//         let insertValues = [shelf];

//         return client.query(INSERT, insertValues)
//           .then(results => {
//             return results.rows[0].id;
//           })
//       }
//     })
// }

function handleError(error, response) {
  response.render('pages/error', { error: error });
}

module.exports = {createBook, getBooks, getBook, updateBook, deleteBook, newSearch, createSearch};