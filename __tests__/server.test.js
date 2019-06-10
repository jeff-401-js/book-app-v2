'use strict';

// const Book = require(`../data/mongo/categories.js`);
// const categories = new Category();

// const supergoose = require('./supergoose.js');

// beforeAll(supergoose.startDB);
// afterAll(supergoose.stopDB);

// describe('Category Model', () => {
//   it('can post() a new category', () => {
//     let obj = {name:'Fruit'};
//     return categories.post(obj)
//       .then(record => {
//         Object.keys(obj).forEach(key =>{
//           expect(record[key]).toEqual(obj[key]);
//         });
//       });
//   });

//   it('can get() a category', () => {
//     let obj = {name:'Fruit'};
//     return categories.post(obj)
//       .then(record => {
//         return categories.get(record._id)
//           .then(category => {
//             Object.keys(obj).forEach(key =>{
//               expect(category[0][key]).toEqual(obj[key]);
//             });
//           });
//       });
//   });
  
//   it('can put() a category', () => {
//     let obj = {name:'Fruit'};
//     let obj2 = {name: 'Pizza'};
//     return categories.post(obj)
//       .then(record => {
//         return categories.put(record._id, obj2)
//           .then(category => {
//             Object.keys(obj2).forEach(key =>{
//               expect(category[key]).toEqual(obj2[key]);
//             });
//           });
//       });
//   });

//   it('can delete() a category', () => {
//     let obj = {name:'Fruit'};
//     return categories.post(obj)
//       .then(record => {
//         return categories.delete(record._id)
//           .then(category => {
//             return categories.get(category._id)
//               .then(cat => {
//                 expect(cat.length).toBe(0);
//               });
//           });
//       });
//   });
// });