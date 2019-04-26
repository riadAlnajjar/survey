const response = require('../util/response');
const User = require('../models/user');

module.exports.Register = (req, res) => {
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('name', 'name is too large').isLength({max: 30});
    req.checkBody('email', 'email not valid').isEmail();
    req.checkBody('password', 'password is required from 8 to 30').isLength({min: 8, max: 30});
    req.checkBody('password2', 'password does not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        return res.json(response.build({InputErrors: errors}));
    } else {
        const user = new User(req.body);
        user.save((err, Token) => {
            return err ?
                res.json(response.build({messages: err})) :
                res.json(response.build({data: {token: Token, name: user.name}, danger: false}));
        });
    }
};

module.exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (user) => {
        if (!user) {
            //UnKnown User
            return res.json(response.build({messages: 'UnKnown User'}));
        }
        User.ComparePassword(password, user.password, (err, isMath) => {
            if (isMath) {
                User.HaveNewToken(user.email, (token) => {
                    return res.json(response.build({data: {token: token, name: user.name}, danger: false}));
                });
            } else {
                return res.json(response.build({messages: 'invalid password'}));
            }
        });
    });
};