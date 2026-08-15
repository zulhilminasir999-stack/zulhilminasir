process.env.NODE_ENV = 'production';
const originalListen = require('node:net').Server.prototype.listen;
require('node:net').Server.prototype.listen = function(...args) {
  console.log("Intercepted listen:", args);
  process.exit(0);
};
require('./dist/server.cjs');
