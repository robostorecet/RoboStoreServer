var MongoClient = require('mongodb').MongoClient
var db = null;
exports.connect = function () {
    if (db) return
    MongoClient.connect(process.env.PROD_MONGODB, function (err, database) {
        if (err) console.log(error);
        else db = database;
        console.log("connected to mlab databse");
    });
}
exports.get = function () {
    return db;
}
exports.close = function () {
    if (db) {
        db.close(function (err, result) {
            db = null
        })
    }
}