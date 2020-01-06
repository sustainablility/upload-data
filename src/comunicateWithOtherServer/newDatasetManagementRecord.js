let request = require('request-promise');
let config = require('../../config');
let encryption = require('../microservice-communication-encryption/index');
let log = require("../log");

async function newDatasetManagementRecord(datasetName, publicity, metaData, dataOwnerList, dataAdminList) {
    let response = await request({
        method: "POST",
        uri: config.datasetManagementURL + "/newDatasetRecord",
        body: {
            datasetName: encryption.encrypt(datasetName),
            datasetPublicity: encryption.encrypt(publicity),
            datasetMetaData: encryption.encrypt(metaData),
            datasetOwnerList: encryption.encrypt(dataOwnerList),
            datasetAdminList: encryption.encrypt(dataAdminList)
        },
        json: true
    }).catch(err => {
        console.log(err);
        log.fatal("Cannot create new dataset management record", err);
    });
    if (response === undefined) {
        return false;
    }
    return response === 0;


}

module.exports = newDatasetManagementRecord;