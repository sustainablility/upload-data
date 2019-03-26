let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../config').database;
let log = require('../log');

/**
 * How to use:
 * call the function -> put all the action in callback function -> before finished, please call 'done()' (The last parameter)
 * Example:
 * connectToMainDatabase((err,db,done) => {
 *     // Doing something
 *     db.createCollection(xxx);
 *
 *     done()
 * })
 */

function connectToMainDatabase(callback = (err,db,done) => { done() }) {
    let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + '/';
    mongoClient.connect(dbUrl,{ useNewUrlParser: true }, (err, dbs) => {
        let db = dbs.db(databaseConfig.main);
        let done = () => {
            dbs.close();
        };
        if (err) {
            log.fatal("Cannot Connect to database", err);
            callback({
                msg: "Cannot Connect to database"
            },done);
        }else {
            callback(null,db,done);
        }
    });
}

function connectToDatasetDatabase(callback = (err,db,done) => { done() }) {
    let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + '/' + databaseConfig.dataset;
    mongoClient.connect(dbUrl,{ useNewUrlParser: true }, (err, dbs) => {
        let db = dbs.db(databaseConfig.dataset);
        let done = () => {
            dbs.close();
        };
        if (err) {
            log.fatal("Cannot Connect to database", err);
            callback({
                msg: "Cannot Connect to database"
            },done);
        }else {
            callback(null,db,done);
        }
    });
}

exports.connectToDatasetDatabase = connectToDatasetDatabase;
exports.connectToMainDatabase = connectToMainDatabase;