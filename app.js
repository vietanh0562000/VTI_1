/**
 * External Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { encode } = require('querystring');
const { body, validationResult } = require('express-validator');
const user = require('./models/user');
/**
 * Internal Modules
 */
const authMiddleware = require('./middlewares/AuthMiddleware');
const authController = require('./controllers/AuthController');
const newsController = require('./controllers/NewsController');
const userController = require('./controllers/UserController');
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8080";

/**
 * App Configuration
 */

/**
 * Get Data
 */


/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Router
 */
app.get('/', function (req, res) {
    res.render('login', { title: "Log in" });
});
app.get('/users', user.getUsers);

app.post('/login',
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 4 }),
    function(req, res){
        authController.login(req, res);
    });
app.post('/register',
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 4}),
    body('phone').isMobilePhone(),
    function(req, res){
        userController.register(req, res);
    });

app.use(authMiddleware.isAuth);
app.get('/news', function (req, res) {
    newsController.getNews(req, res);
});
app.get('/news/find', function (req, res) {
    newsController.findNews(req, res);
});
app.post('/news/add', function(req, res){
    newsController.addNews(req, res);
})
app.post('/news/update/:id', function(req, res){
    newsController.updateNews(req, res);
})
app.delete('/news/delete/:id', function(req, res){
    newsController.deleteNews(req, res);
})
/**
 * Server activate
 */
app.listen(port, function () {
    console.log(`Server is on port ${port}`);
})