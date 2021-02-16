/**
 * External Modules
 */

const { encode } = require('querystring');
const { body, validationResult } = require('express-validator');
const user = require('./models/user');
const express = require('express');
const routes = express.Router();
/**
 * Internal Modules
 */
const authMiddleware = require('./middlewares/AuthMiddleware');
const authController = require('./controllers/AuthController');
const newsController = require('./controllers/NewsController');
const userController = require('./controllers/UserController');

/**
 * Router
 */
routes.get('/', function (req, res) {
    res.render('login', { title: 'Log in' });
});
// app.get('/users', user.getUsers);

routes.post('/login',
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 4 }),
    function(req, res){
        authController.login(req, res);
    });
routes.post('/register',
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 4}),
    body('phone').isMobilePhone(),
    function(req, res){
        userController.register(req, res);
    });

routes.use(authMiddleware.isAuth);
routes.get('/news', function (req, res) {
    newsController.getNews(req, res);
});
routes.get('/news/find', function (req, res) {
    newsController.findNews(req, res);
});
routes.post('/news/add', function(req, res){
    newsController.addNews(req, res);
})
routes.post('/news/update/:id', function(req, res){
    newsController.updateNews(req, res);
});
routes.delete('/news/delete/:id', function(req, res){
    newsController.deleteNews(req, res);
});

module.exports = routes;