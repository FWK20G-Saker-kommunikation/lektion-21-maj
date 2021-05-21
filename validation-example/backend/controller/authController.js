const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const { checkCredentials, createAccount, 
        getUserByUsername } = require('../model/operations');
const { validateBody } = require('../utils/utils');

function login(request, response) {
  const credentials = request.body;

  const isAMatch = checkCredentials(credentials);

  let result = { success: false };

  if (isAMatch) {
    const user = getUserByUsername(credentials.username);
    console.log('User', user);

    const token = jwt.sign({ id: user.id}, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });

    result.success = true;
    result.token = token;
  }

  response.json(result);
}

function getLoginStatus(request, response) {
  const token = request.header('Authorization').replace('Bearer ', '');

  let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, 'a1b1c1');

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result.loggedIn = true;
    }
  }

  response.json(result);
}

function createNewAccount(request, response) {
  const account = request.body
  let result = { success: false }

  if (validateBody(account)) {
    account.role = 'user'; //Skapar egenskapen role och sätter till user
    account.id = nanoid();
    console.log('Account to add:', account);
    const createdAccount = createAccount(account);

    if (createdAccount) {
      result.success = true;
    }
  } else {
    result.error = 'Wrong properties';
  }

  response.json(result);
}

module.exports.login = login;
module.exports.getLoginStatus = getLoginStatus;
module.exports.createNewAccount = createNewAccount;



/**
 * jwt.sign() - signerar en token
 * jwt.verify() - veriferar en token
 */