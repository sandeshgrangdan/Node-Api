const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.encrypt = (password) => bcrypt.hash(password, saltRounds);

exports.verify = (password, hash) => bcrypt.compare(password, hash);
