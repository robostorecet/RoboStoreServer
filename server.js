var express = require('express');
var router = require('./js/routes.js');
var app = express();
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
// set the home page route
app.get('/', router.getItems);
app.listen(port, function () {
    console.log("Our app is running on http://localhost:" + port);
});