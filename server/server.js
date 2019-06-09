'use strict';


// Application Dependencies
const express = require('express');




// Application Setup
const app = express();
const PORT = process.env.PORT;



// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('../middleware/methodOverride.js'))



// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
