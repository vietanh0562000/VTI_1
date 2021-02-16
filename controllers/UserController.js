const { validationResult } = require('express-validator');
const user = require('../models/user');

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
        let query = 'INSERT INTO users VALUES($1, $2, $3, $4)';
        let values = [id, username, password, phone];
        
        
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    register
}