const fs = require('fs');

module.exports.ready = function (database, table, callback) {
    fs.mkdir(database, () => {
        fs.mkdir(table, callback);
    });
};

module.exports.userCollection = function (UserTable, callback) {
    fs.mkdir(UserTable, (err) => {
        if (err) throw err;
        fs.writeFile(UserTable + "/mails", '[]', (err) => {
            if (err) throw err;
            fs.writeFile(UserTable + '/forms', '[]', callback);
        });
    });
};