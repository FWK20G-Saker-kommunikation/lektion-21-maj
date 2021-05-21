const { Router } = require('express');
const router = new Router();

const { admin, user } = require('../middleware/auth');
const { getUser, getAllUsers, 
        changeNewPassword, removeAccount } = require('../controller/userController');

router.get('/', user, getUser);

router.get('/all', admin, getAllUsers);

router.post('/change', admin, changeNewPassword);

router.delete('/remove', user, removeAccount);

module.exports = router;