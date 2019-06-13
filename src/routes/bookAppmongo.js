'use strict';

// Application Dependencies
const superagent = require('superagent');
const express = require('express');
const router = express.Router();
const book = require('../models/books.js');
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
router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

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
  createShelf(request.body.bookshelf)
    .then(data => {
      let record = request.body;
      record.bookshelf_id = data._id;
      let newBook = new book(record);
      newBook.save()
        .then(result => response.redirect(`/books/${result._id}`))
        .catch( next );
    })
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
  book.findById(request.params.id)
    .then(data => {
      return bookshelves.find()
        .then(results => response.render('pages/books/show', {book: data, bookshelves: results}))
    })
    .catch( next );
}

function updateBook(request, response, next){
  book.findByIdAndUpdate(request.params.id, request.body)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch( next );
}

function deleteBook(request, response, next){
  book.findByIdAndDelete(request.params.id, request.body)
    .then(response.redirect('/'))
    .catch( next );
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

function createShelf(shelf){
  let normalizedShelf = shelf.toLowerCase();
  return bookshelves.findOneAndUpdate(
    {bookshelf: normalizedShelf},
    {bookshelf: normalizedShelf},
    {upsert: true, new: true}
  );
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

function handleError(error, response) {
  response.render('pages/error', { error: error });
}

module.exports = router;
