const { validationResult } = require('express-validator');
const db = require('../data/connect');

async function register(req, res) {
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(404).json({messge: errors.array()});
    }
    console.log(req.body);
    try {
        let id = Math.floor(Math.random() * 1000);
        let username = req.body.username;
        let password = req.body.password;
        let phone = req.body.phone;

        await db.query(`INSERT INTO users VALUES ('${id}', '${username}', '${password}', '${phone}')`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ message: 'Register success' });
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    register: register
}