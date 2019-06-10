'use strict';

const Mongo = require('./mongo-model.js');
const schema = require('./book-schema.js');

class Books extends Mongo {}

module.exports = new Books(schema);
