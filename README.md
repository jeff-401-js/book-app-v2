# book-app-v2
Book App V2

### Author: Student/Group Name
Jeff

### Links and Resources
* [submission PR](https://github.com/JeffLawrence1/book-app-v2/pull/1)
* [travis](https://www.travis-ci.com/jeff-401-js/book-app-v2)
* [heroku](https://murmuring-sea-94133.herokuapp.com/)


#### Documentation
* [UML]()

### Modules


### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost:27017/bookAppV2

#### Running the app
* `nodemon index.js`
* Endpoint: GET`'/'`
  * Show all.
* Endpoint: POST`'/searches'`
  * Create search.
* Endpoint: GET`'/searches/new'`
  * New search
* Endpoint: GET`'/books/:id'`
  * Get certain book
* Endpoint: POST`'/books'`
  * Create book
* Endpoint: PUT`'/books/:id'`
  * Update certain book
* Endpoint: DELETE`'/books/:id'`
  * Delete certain book

  
#### Tests
* How do you run tests?
npm test `filename.test.js`
