const jwt = require('jsonwebtoken');
const { getUserById } = require('../model/operations');
const { refreshToken } = require('../utils/utils');

function admin(request, response, next) {
  const loggedInId = request.cookies.loggedIn;
  console.log('admin cookies', loggedInId);
  try {
    const user = getUserById(loggedInId);
    console.log('admin middleware', user);
    if (!user) {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else if (user.role !== 'admin') {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else {
      next(); //Gå vidare till nästa callback i endpoint:en
    }
  } catch (error) {
    response.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

function user(request, response, next) {
  //Verifiera om token är valid och isåfall hämta matchande användare och returnera
  //Annars neka åtkomst och returnera ett fel
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, 'a1b1c1');
    console.log('user middleware jwt verify:', data);

    const user = getUserById(data.id);

    if (!user) {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else if (user.role !== 'user') {
      throw new Error(); //Kommer istället att hoppa in i catchen nedan
    } else {
      request.user = user;
      request.token = refreshToken(data.id);
      next(); //Gå vidare till nästa callback i endpoint:en
    }
  } catch (error) {
    response.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

exports.admin = admin;
exports.user = user;