'use strict';


// Application Dependencies
const express = require('express');

const methodOverride = require('./middleware/methodOverride.js')
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const DB = process.env.DB_TOGGLE || 'pg';
const bookApp = require(`./routes/bookApp${DB}.js`);

// Application Setup
const app = express();
const PORT = process.env.PORT;

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride);
app.use(express.static('public'));

//Routes
app.use(bookApp);

//Default Route
app.get('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: () =>{
    PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
};
