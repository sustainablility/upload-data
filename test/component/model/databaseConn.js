let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../../config').database;
let assert = require('chai').assert;

describe("Unit test for Database Connection", function () {
    it('should have no error', function (done) {
        let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port;
        mongoClient.connect(dbUrl, { useNewUrlParser: true },function (err,database) {
            assert.equal(err, null, "Database Connection Error");
            database.close();
            done();
        });
    });
});