const response = require('../util/response');
const Mail = require('../models/mail');

module.exports.getMailsByUser = (req, res) => {
    Mail.getMails(req.body, req.query.filter, (err, mails) => {
        if (err) {
            res.json(response.build({
                messages: err,
                danger: true
            }));
        } else {
            res.json(response.build({data: mails}));
        }
    });
};

module.exports.register = (req, res) => {
    const newMail = new Mail(req.body);
    newMail.save((resp) => {
        if (resp.success) {
            res.json(response.build({data: resp.info}));
        } else {
            res.json(response.build({messages: resp.info, danger: resp.success}));
        }
    });
};