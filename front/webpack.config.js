let NPM_ENV = process.env.npm_lifecycle_event;
let isProd = NPM_ENV === 'build';

if(isProd) {
    module.exports = require('./config/webpack.prod.js');
}
else {
    module.exports = require('./config/webpack.dev.js');
}
