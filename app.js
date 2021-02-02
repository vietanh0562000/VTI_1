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

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8080";
let news = [];
/**
 * App Configuration
 */

/**
 * Get Data
 */

fs.readFile('./data/news.json', encoding = 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        return;
    }
    news = JSON.parse(data);
    console.log(news);
})
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

app.use(authMiddleware.isAuth);
app.get('/news', function (req, res) {
    res.json(news);
});
app.get('/news/find', function (req, res) {
    let order = {
        title : req.query.title,
        author : req.query.author,
        description : req.query.description
    };
    
    const result = news.filter(function (currentNews) {
        let isSuccess = true;
        for (let key in order) {

            if (order[key])
                if (!currentNews[key].toLowerCase().includes(order[key].toLowerCase())) isSuccess = false;
        }
        return isSuccess;
    });
    res.json(result);
});
app.post('/news/add', function (req, res) {
    let newNews = req.body;
    newNews["id"] = "" + (news.length + 1);
    news.push(newNews);
    res.json({ message: "Add news success" });
});
app.post('/news/update/:id', function (req, res) {
    let id = req.params.id;
    let newData = req.body;
    for (let currentNews of news) {
        if (currentNews["id"] == id) {
            for (let key in newData) {
                currentNews[key] = newData[key];
            }
        }
    }
    res.json({ message: "Update success" });
});
app.delete('/news/delete/:id', function (req, res) {
    let id = req.params.id;
    for (let i = 0; i < news.length; i++) {
        if (news[i]["id"] == id) {
            news.splice(i, 1);
            res.json({ message: 'Delete success' });
            return;
        }
    }
});
/**
 * Server activate
 */
app.listen(port, function () {
    console.log(`Server is on port ${port}`);
})