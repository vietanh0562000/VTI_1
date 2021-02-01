const fs = require('fs');

let users = [];
function getUsers() {
    fs.readFileSync("D:/VTI/firstApp/data/users.json", encoding = 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        users = JSON.parse(data);
        //console.log(users);
    });
    return users;
}

module.exports = {
    getUsers: getUsers,
}