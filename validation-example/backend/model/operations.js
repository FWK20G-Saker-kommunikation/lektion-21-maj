const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('users.json');
const database = lowdb(adapter);

const { hashPassword, comparePassword } = require('../utils/utils');

function getUserById(id) {
  return database.get('accounts').find({ id: id }).value();
}

function getUserByUsername(username) {
  return database.get('accounts').find({ username: username }).value();
}

async function checkCredentials(credentials) {
  const user = database.get('accounts')
          .find({ username: credentials.username })
          .value();
  
  if (user) {
    return await comparePassword(credentials.password, user.password);
  } else {
    return false;
  }
}

function getUserByRole(role) {
  return database.get('accounts').filter({ role: role }).value();
}

function addCookieId(credentials, cookieId) {
  return database.get('accounts')
          .find({ username: credentials.username })
          .assign({ 'id': cookieId })
          .write();
}

function changePassword(cookieId, pass) {
  return database.get('accounts')
          .find({ id: cookieId })
          .assign({ password: pass })
          .write();
}

function removeUser(cookieId) {
  return database.get('accounts').remove({ id: cookieId }).write();
}

async function createAccount(account) {
  account.password = await hashPassword(account.password);

  return database.get('accounts').push(account).write();
}

exports.getUserById = getUserById;
exports.checkCredentials = checkCredentials;
exports.getUserByRole = getUserByRole;
exports.addCookieId = addCookieId;
exports.changePassword = changePassword;
exports.removeUser = removeUser;
exports.createAccount = createAccount;
exports.getUserByUsername = getUserByUsername