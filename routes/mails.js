const express = require('express');
const MailTools = require('../Tools/mail-Tools');
const router = express.Router();

router.post('/', MailTools.getMailsByUser);

router.post('/', MailTools.register);


module.exports = router;