let log = require('../log');

async function dropCollection(datasetID) {
    let dropResult = await this.datasetDb.dropCollection(datasetID);
    return dropResult;
}

module.exports = dropCollection;