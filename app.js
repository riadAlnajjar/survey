const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('./util/cors');
const cfg = require('configurator');

cfg.set({
    PORT: 8000,
    ALLOWED_ORIGINS: ['http://192.168.43.110:3000', 'http://localhost:3000'],
    SECRET_KEY: 'this is secret key don not tell any one about it OK'
});

console.log(cfg);

const users = require('./routes/users');
const forms = require('./routes/forms');
const mails = require('./routes/mails');

const app = express();

app.use(cors(cfg.ALLOWED_ORIGINS));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/users', users);
app.use('/forms', forms);
app.use('/mails', mails);

app.use(function (req, res) {
    res.status(404).json({});
});

app.listen(process.env.PORT || cfg.PORT, function () {
    console.log('server run on port', cfg.PORT);
});
