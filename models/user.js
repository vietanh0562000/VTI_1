const fs = require('fs');
const path = require('path');

function getUsers(){
    const data = fs.readFileSync(path.join(process.cwd(), 'data', 'users.json'), encoding = 'utf8');
    return JSON.parse(data);
}
module.exports = {
    getUsers: getUsers,
}