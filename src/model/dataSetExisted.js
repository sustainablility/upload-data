let log = require('../log');


async function isDatasetExisted(datasetID) {
    let result = await this.datasetDb.listCollections({
        name: datasetID
    }).toArray().catch(err => {
        log.fatal("Dataset existence verify failed", err);
    });
    return !(result.length === 0);
}

module.exports = isDatasetExisted;