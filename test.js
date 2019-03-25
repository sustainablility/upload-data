let mongoClient = require('mongodb').MongoClient;
let url = "mongodb://lb.thatseed.org:27017";

mongoClient.connect(url,{
    useNewUrlParser: true
},(err,db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Done");
    }
    db.close();
});