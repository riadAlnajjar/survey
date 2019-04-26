const express       = require('express');
const FormsTools    = require('../Tools/form-Tools');

const router = express.Router();

router.post('/register', FormsTools.register);

router.post('/', FormsTools.getUserForms);

router.post('/:id', FormsTools.findOne);

module.exports = router;