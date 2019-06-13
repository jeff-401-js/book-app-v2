'use strict';

module.exports = (error, req, res) => {
  res.status(500);
  res.statusMessage = 'Server error';
  res.json({error});
};
