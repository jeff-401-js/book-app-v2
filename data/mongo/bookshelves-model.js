'use strict';

const Mongo = require('./mongo-model.js');
const schema = require('./bookshelves-shema.js');

class Bookshelves extends Mongo {}

module.exports = new Bookshelves(schema);
