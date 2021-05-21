const { Router } = require('express');
const router = new Router();

const { login, getLoginStatus, createNewAccount } = require('../controller/authController');

router.post('/', login);

router.get('/loggedin', getLoginStatus);

router.post('/create', createNewAccount);

module.exports = router;
