/**
 * External Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

/**
 * Internal Modules
 */
const routes = require('./route');
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || '8080';

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
app.use('/', routes);
/**
 * Server activate
 */
app.listen(port, function () {
    console.log(`Server is on port ${port}`);
})