let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../config').database;
let log = require('../log');

class ModelClass {
    constructor() {
        this.dataSetExisted = require('./dataSetExisted');
        this.newCollectionDatasetFromArray = require('./newCollectionDatasetFromArray');
        this.removeDataset = require('./dropCollection');
    }

    async connect() {
        let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + '/';
        let dbs = await mongoClient.connect(dbUrl,{ useNewUrlParser: true }).catch(error => {
            log.fatal("Cannot connect to database",error);
        });
        if (dbs === undefined) {
            return false;
        } else {
            this.done = () => {
                dbs.close();
            };
            this.datasetDb = dbs.db(databaseConfig.dataset);
            this.manageDb = dbs.db(databaseConfig.manage);
            return true;
        }
    }
}

module.exports = ModelClass;