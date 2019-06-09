'use strict';


// Application Dependencies
const express = require('express');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const router = require('../routes/routes.js');

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('../middleware/methodOverride.js'))

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

app.use(router);

module.exports = {
  server: app,
  start: port =>{
    PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
};



