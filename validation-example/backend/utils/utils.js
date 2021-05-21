const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

function refreshToken(userId) {
  return jwt.sign({ id: userId}, 'a1b1c1', {
    expiresIn: 600 //Går ut om 10 min
  })
}

function validateBody(body) {
  if (body.hasOwnProperty('username') && body.hasOwnProperty('password')
      && body.hasOwnProperty('email') && body.hasOwnProperty('firstname')
      && body.hasOwnProperty('lastname')) {
        return true;
  } else {
    return false;
  }
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.refreshToken = refreshToken;
exports.validateBody = validateBody;