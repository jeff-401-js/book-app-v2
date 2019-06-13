'use strict';

require('dotenv').config();

require('./src/server.js').start(process.env.PORT);


// 'use strict';

// require('dotenv').config();

// const {server} = require('./src/server.js');
// server.start(process.env.PORT);
