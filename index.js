'use strict';

require('dotenv').config();

require('./server/server.js').start(process.env.PORT);


// 'use strict';

// require('dotenv').config();

// const {server} = require('./src/server.js');
// server.start(process.env.PORT);
