var express = require('express');
var bodyParser = require('body-parser');
var router = require('./js/routes.js');
var app = express();
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
// set the home page route
/*app.use(bodyParser.urlencoded({
    extended: true
}));*/
app.use(bodyParser.json());
app.get('/types', router.getTypes);
app.get('/items/:type/:name', router.getItems);
app.get('/notes/:branch/:sem', router.getNotes);
app.post('/order', router.postOrder);
app.post('/notes', router.postNotes);
app.listen(port, function () {
    console.log("Our app is running on http://localhost:" + port);
});