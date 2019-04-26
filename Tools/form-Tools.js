const Form = require('../models/form');
const response = require('../util/response');

module.exports.register = (req, res) => {
    const newForm = new Form(req.body);
    newForm.save((err, id) => {
        if (err) {
            res.json(response.build({
                messages: err
            }));
        } else {
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + id;
            console.log(fullUrl);
            res.json(response.build({
                danger: false
            }));
        }
    });
};

module.exports.getUserForms = (req, res) => {
    if (typeof req.body.user === "undefined") {
        res.json(response.build({
            messages: "user not found please enter user"
        }));
    } else
        Form.getFormsByUser(req.body.user, (err, forms) => {
            if (err) {
                res.json(response.build({
                    messages: err
                }));
            } else {
                res.json(response.build({
                    data: forms,
                    danger: false
                }));
            }
        });
};

module.exports.findOne = (req, res) => {
    const id = req.params.id;
    Form.getFormById(id, data => {
        if (data) {
            res.json(response.build({
                data: data,
                danger: false
            }));
        } else {
            res.json(response.build({
                messages: 'form not found'
            }));
        }
    });
};