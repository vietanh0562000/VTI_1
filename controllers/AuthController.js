/**
 * External Module
 */
const { validationResult } = require('express-validator');
/**
 * Internal Module
 */
const jwtHelper = require("../helpers/jwt.helper");
const usersData = require('../models/user');
const db = require('../data/connect');
// Ds token
let tokenList = {};

// Thoi gian cua token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1d";

// secretKey
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-VanhDV";


let login = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ message: errors.array() });
        }

        let userToFind = req.body;
        console.log("get users");
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                throw err;
            }
            let users = results.rows;
            users.forEach(async currentUser => {
                console.log(currentUser);
                if (userToFind.username === currentUser.username && userToFind.password === currentUser.password) {

                    const accessToken = await jwtHelper.generateToken(currentUser, accessTokenSecret, accessTokenLife);
                    console.log(accessToken);
                    return res.status(200).json({ accessToken });
                }
               
            })
            
        });


        

    } catch (error) {
        return res.json({ message: "Un authorized" });
    }
}

module.exports = {
    login: login,
}
