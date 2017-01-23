var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
//app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
//app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    	MongoClient.connect(process.env.PROD_MONGODB, function (err, db) {
	  if (err)
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  else {
	    //console.log('Connection established to');
	    var collection = db.collection("Demo");
	    collection.find().toArray(function (err, result){
      		if (err)
       		    console.log(err);
		else
			res.json(result[0]);
	    });
	   db.close();
	  }
	});

});

app.listen(port, function() {
    console.log("Our app is running on http://localhost:" + port);
});
