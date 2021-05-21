const { getUserById, getUserByRole, 
  changePassword, removeUser } = require('../model/operations');

function getUser(request, response) {
  console.log(request.user);

  let result = { success: false };
  
  if (request.user) {
    result.success = true;
    result.user = {
      firstname: request.user.firstname,
      lastname: request.user.lastname,
      email: request.user.email,
      role: request.user.role
    };
    result.token = request.token;
  }

  response.json(result);
}

function getAllUsers(request, response) {
  const allUsers = getUserByRole('user');

  response.json(allUsers);
}

function changeNewPassword(request, response) {
  const password = request.body.password;
  const loggedInId = request.cookies.loggedIn;

  const changedPassword = changePassword(loggedInId, password);

  let result = { success: false }

  if (changedPassword) {
    result.success = true;
  }

  response.json(result);
}

function removeAccount(request, response) {
  const loggedInId = request.cookies.loggedIn;

  const removedUser = removeUser(loggedInId);

  let result = { success: false }

  if (removedUser) {
    result.success = true;
  }

  response.json(result);
}

module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
module.exports.changeNewPassword = changeNewPassword;
module.exports.removeAccount = removeAccount;

console.log(module.exports);