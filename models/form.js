const path = require('path');
const fs = require('fs');
const db = require('../util/database');

const database = path.join(__dirname, '..', 'dataHolder');
const table = path.join(database, 'forms');
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function makeId(length) {
    if (!length)
        length = 8;
    let text = "";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = class FORM {
    constructor(obj) {
        this.form = obj;
    }

    save(finish) {

        if (typeof this.form.user === "undefined") {
            return finish('you have to define the user');
        }

        db.ready(database, table, () => {
            const PathToUserForms = path.join(__dirname, '..', 'dataHolder', 'users', this.form.user, 'forms');
            fs.readFile(PathToUserForms, (err, data) => {
                if (err) {
                    return finish('user not found');
                } else {
                    const check = (id, forms) => {
                        const element = path.join(table, id);
                        fs.stat(element, (err) => {
                            if (!err) {
                                id += possible.charAt(Math.floor(Math.random() * possible.length));
                                check(id, forms);
                            } else if (err.code === 'ENOENT') {
                                forms.push(id);
                                fs.writeFile(PathToUserForms, JSON.stringify(forms), () => {
                                    fs.writeFile(element, JSON.stringify(this.form), () => {
                                        console.log('new form \'' + id + '\' added');
                                        finish(null, id);
                                    });
                                });
                            } else {
                                finish('failed to save form');
                            }
                        });
                    };
                    const FormsArray = JSON.parse(data);

                    let ID = makeId(8);

                    check(ID, FormsArray);
                }
            });
        });
    };


    static getFormById(id, callback) {
        var element = path.join(table, id);
        fs.readFile(element, (err, data) => {
            if (err) {
                callback(false);
            } else {
                callback(JSON.parse(data));
            }
        });
    };

    static getFormsByUser(user, callback) {
        const forms = [];
        const FormPath = path.join(__dirname, '..', 'dataHolder', 'users', user, 'forms');
        fs.readFile(FormPath, (err, data) => {
            if (err) {
                callback('user not found');
            } else {
                const array = JSON.parse(data);
                array.forEach(id => {
                    const element = path.join(table, id);
                    try {
                        forms.push(JSON.parse(fs.readFileSync(element)));
                    } finally {}
                });
                callback(null, forms);
            }
        });
    }

};

