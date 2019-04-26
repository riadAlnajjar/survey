const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

module.exports = class Mail {
    constructor(info) {
        this.S = info.sender;
        this.R = info.receiver;
        this.msg = info.msg;
        this.date = new Date();
    }

    save(callback) {
        const end = {
            success: false,
            info: null
        };

        if (!this.S) {
            end.info = 'you have to insert the sender';
            return callback(end);
        }

        if (!this.R) {
            end.info = 'you have to enter the receiver';
            return callback(end);
        }

        if (this.S === this.R) {
            end.info = 'can\'t send the email to you self';
            return callback(end);
        }

        if (typeof this.msg != "string") {
            end.info = 'no content found';
            return callback(end);
        }

        const sender = path.join(__dirname, '..', 'dataHolder', 'users', this.S, 'mails');
        const receiver = path.join(__dirname, '..', 'dataHolder', 'users', this.R, 'mails');
        fs.readFile(receiver, (err, rcv_arr) => {
            if (err) {
                end.info = 'receiver not found';
                callback(end);
            } else {
                fs.readFile(sender, (err, snd_arr) => {
                    if (err) {
                        end.info = 'sender not found';
                        callback(end);
                    } else {
                        const snd_data = JSON.parse(snd_arr);
                        const rcv_data = JSON.parse(rcv_arr);
                        snd_data.push(this);
                        fs.writeFile(sender, JSON.stringify(snd_data), err => {
                            if (err) {
                                end.info = 'can\'t write the message on the sender';
                                callback(end);
                            } else {
                                rcv_data.push(this);
                                fs.writeFile(receiver, JSON.stringify(rcv_data), err => {
                                    if (err) {
                                        end.info = 'can\'t write the message on the receiver';
                                        callback(end);
                                    } else {
                                        end.info = this;
                                        end.success = true;
                                        callback(end);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    static getMails(user, type, callback) {
        if (!user.email || !user.password) {
            return callback('failed in authenticate the user');
        }
        const ProfPath = path.join(__dirname, '..', 'dataHolder', 'users', user.email, 'pf');
        const FormPath = path.join(__dirname, '..', 'dataHolder', 'users', user.email, 'mails');
        fs.readFile(ProfPath, (err, data) => {
            if (err) {
                callback('user not found');
            } else {
                const password = JSON.parse(data).password;
                bcrypt.compare(user.password, password, function (err, isMath) {
                    if (err) throw err;
                    if (isMath) {
                        fs.readFile(FormPath, (err, data) => {
                            const FormArray = JSON.parse(data);
                            if (type === 'sent') {
                                callback(null, FormArray.filter(m => m.S === user.email));
                            } else if (type === 'received') {
                                callback(null, FormArray.filter(m => m.R === user.email));
                            } else {
                                callback(null, FormArray);
                            }
                        });
                    } else
                        callback('password failure');
                });
            }
        });
    };

};