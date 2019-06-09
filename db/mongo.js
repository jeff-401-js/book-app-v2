'use strict';


// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const morgan = require('morgan');

// Database Setup
require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);


//Models
const Book = require('../data/mongo/book-model.js');
const book = new Book();

// const Bookshelves = require('./data/mongo/bookshelves-model.js');
// const bookshelf = new Bookshelves();

// Prepare the express app
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

function createBook(request, response, next){
  book.post(request.body)
    .then(response.redirect('/'))
    .catch( next );
}

function getBooks(request, response, next) {
  book.get()
    .then( data => {
      if(data.length === 0){
        response.render('pages/searches/new');
      }else{
        response.render('pages/index', {books: data})
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
  book.put(request.params.id, request.body)
    .then(response.redirect(`books/${request.params.id}`))
    .catch( next );
}

function deleteBook(request, response, next){
  let id = [request.params.id];
  book.delete(id)
    .then(response.redirect('/'))
    .catch( next );
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

function newSearch(request, response) {
  response.render('pages/searches/new');
}


function getBookshelves() {
  // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
  let SQL = 'SELECT DISTINCT id, name FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

function createShelf(shelf) {
  let normalizedShelf = shelf.toLowerCase();
  let SQL1 = `SELECT id from bookshelves where name=$1;`;
  let values1 = [normalizedShelf];

  return client.query(SQL1, values1)
    .then(results => {
      if (results.rowCount) {
        return results.rows[0].id;
      } else {
        let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
        let insertValues = [shelf];

        return client.query(INSERT, insertValues)
          .then(results => {
            return results.rows[0].id;
          })
      }
    })
}


function updateBook(request, response) {
  let { title, author, isbn, image_url, description, bookshelf_id } = request.body;
  // let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;`;
  let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
  let values = [title, author, isbn, image_url, description, bookshelf_id, request.params.id];

  client.query(SQL, values)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
}

function deleteBook(request, response) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

function handleError(error, response) {
  response.render('pages/error', { error: error });
}

module.exports = {getBooks, newSearch, createSearch, getBook, createBook, updateBook, deleteBook};
