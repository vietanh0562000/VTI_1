/**
 * External Module
 */
const {validationResult} = require('express-validator');
/**
 * Internal Module
 */
const jwtHelper = require("../helpers/jwt.helper");
const userData = require('../models/user');
// Ds token
let tokenList = {};

// Thoi gian cua token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1";

// secretKey
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-VanhDV";


let login = async (req, res) =>{
    try{
        const users = userData.getUsers();
        console.log(users);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ message: errors.array() });
        }
        console.log(req.body);
        let userToFind = req.body;
        let user = users.find(function (currentUser) {
            return (userToFind.username === currentUser.username && userToFind.password === currentUser.password);
        });
        console.log(user);
        if (user){
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);
            tokenList[refreshToken] = {accessToken, refreshToken};

            return res.status(200).json({accessToken, refreshToken});
        }
        else res.redirect('/');
        
    } catch(error){
        return res.json({message: "Un authorized"});
    }
}

module.exports = {
    login: login,
}
