const jwt = require('jsonwebtoken');
const cfg = require('configurator');
const response = require('./response');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    jwt.verify(token, cfg.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.json(response.build({messages: err.message}));
        } else {
            User.getUserByEmail(decoded.email, user => {
                if(user){
                    next();
                }else{
                    res.json(response.build({messages: "user not found"}));
                }
            });
        }
    });
};


