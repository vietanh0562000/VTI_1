/**
 * External Module
 */
const {validationResult} = require('express-validator');
/**
 * Internal Module
 */
const jwtHelper = require("../helpers/jwt.helper");
const usersData = require('../models/user');
// Ds token
let tokenList = {};

// Thoi gian cua token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1d";

// secretKey
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-VanhDV";


let login = async (req, res) =>{
    try{
        const users = usersData.getUsers();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ message: errors.array() });
        }
       
        let userToFind = req.body;
        let user = users.find(function (currentUser) {
            return (userToFind.username === currentUser.username && userToFind.password === currentUser.password);
        });
        
        if (user){
           
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            console.log(accessToken);
            
            
            return res.status(200).json({accessToken});
        }
        else res.redirect('/');
        
    } catch(error){
        return res.json({message: "Un authorized"});
    }
}

module.exports = {
    login: login,
}
