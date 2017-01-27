var db = require('./db');
//connect to the the databse
db.connect();
exports.getItems = function (req, res) {
    console.log("Get Items handler");
    if (db.get()) {
        var collection = db.get().collection("Items");
        collection.find().toArray(function (err, result) {
            if (err) console.log(err);
            else res.json(result);
        });
    }
    else {
        res.send({
            error: "wait for  second then reaload, everything will be ok"
        });
    }
}