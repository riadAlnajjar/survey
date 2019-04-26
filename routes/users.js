const express           = require('express');
const Validator         = require('express-validator');
const UsersTools        = require('../Tools/user-Tools');
//const IsAuthenticated   =  require('../util/is-auth');

const router = express.Router();

router.post('/register', Validator(), UsersTools.Register);

router.post('/login', UsersTools.login);

module.exports = router;