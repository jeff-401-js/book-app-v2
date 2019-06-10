'use strict';

const Mongo = require('./mongo-model.js');
const schema = require('./bookshelves-schema.js');

class Bookshelves extends Mongo {}

module.exports = new Bookshelves(schema);
