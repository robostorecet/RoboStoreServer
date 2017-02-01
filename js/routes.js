var db = require('./db');
exports.getTypes = function (req, res) {
        console.log("Get types handler");
        if (db.get()) {
            var collection = db.get().collection("Items");
            collection.distinct("type", {}, function (err, result) {
                if (err) console.log(err);
                else res.json(result);
            });
        }
        else {
            res.send({
                error: "wait for 5 seconds then reaload, everything will be ok"
            });
        }
    }
    //get items of specified type
exports.getItems = function (req, res) {
    console.log("Get Items handler");
    if (db.get()) {
        //if no type query parameter then retrive all items
        var collection = db.get().collection("Items");
        collection.find(itemParameters(req), {
            _id: 0
        }).toArray(function (err, result) {
            if (err) console.log(err);
            else res.json(result)
        });
    }
    else {
        res.send({
            error: "wait for 5 seconds then reaload, everything will be ok"
        });
    }
};

function itemParameters(req) {
    var query = {}
    if (req.params.type) {
        //if req.params.type then retrive only items of the specified type
        query = {
            type: req.params.type
        };
    }
    if (req.params.name) {
        //if req.query.type then retrive only items of the specified type
        query.name = req.params.name;
    }
    return query;
}
//handler for order post request
exports.postOrder = function (req, res) {
        console.log("Post order handler");
        if (db.get()) {
            var collection = db.get().collection("Order");
            collection.insert(req.body, function (err, result) {
                if (err) {
                    console.log("error item not inserted");
                    res.send({
                        error: "error item not inserted"
                    });
                }
                else {
                    console.log("item inserted + " + JSON.stringify(result));
                    res.send("[" + JSON.stringify(result) + "]");
                }
            });
        }
        else {
            res.send({
                error: "wait for 5 seconds then reaload, everything will be ok"
            });
        }
    }
    //connect to the the databse
db.connect();