let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../../config').mysqlConfig;
let assert = require('chai').assert;


describe("Unit test for database connection",() => {



    it('should be connected to main database', function (done) {
        let conn = mysql.createConnection(databaseConfig.main);
        conn.connect();
        conn.query("SELECT 1 + 1",function (err) {
            assert.equal(err,null,"Error in connecting to main database");
            conn.end();
            done();
        })
    });

    it('should be connected to data storage database', function (done) {
        let conn = mysql.createConnection(databaseConfig.data);
        conn.connect();
        conn.query("SELECT 1 + 1",function (err) {
            assert.equal(err,null,"Error in connecting to data storage database");
            conn.end();
            done();
        })
    });
});