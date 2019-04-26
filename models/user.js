const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const db = require('../util/database');
const jwt = require('jsonwebtoken');
const cfg = require('configurator');

const database = path.join(__dirname, '..', 'dataHolder');
const table = path.join(database, 'users');

module.exports = class USER {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
    }

    save(callback) {
        db.ready(database, table, () => {
            const element = path.join(table, this.email);
            fs.stat(element, (err) => {
                if (!err) {
                    callback('please take other email');
                } else if (err.code === 'ENOENT') {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(this.password, salt, (err, hash) => {
                            this.password = hash;
                            db.userCollection(element, err => {
                                if (err) throw err;
                                jwt.sign({email: this.email}, cfg.SECRET_KEY, {expiresIn: '168h'}, (err, token) => {
                                    if (err) {
                                        return callback('could not generate a token');
                                    }
                                    fs.writeFile(element + '/pf', JSON.stringify(this), () => {
                                        console.log('new user \'' + this.email + '\' added');
                                        callback(null, token);
                                    });
                                });
                            });
                        });
                    });
                } else {
                    callback(err.code);
                }
            });
        });
    };

    static getUserByEmail(email, callback) {
        if (typeof email != 'string') {
            return callback(null);
        }
        const profilePath = path.join(table, email, 'pf');
        fs.readFile(profilePath, function (err, user) {
            if (err) {
                callback(null);
            } else {
                callback(JSON.parse(user));
            }
        });
    };

    static HaveNewToken(email, callback) {
        jwt.sign({email: email}, cfg.SECRET_KEY, {expiresIn: '168h'}, (err, token) => {
            return callback(token);
        });
    }

    static ComparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, function (err, isMath) {
            if (err) throw err;
            callback(null, isMath);
        });
    };

};