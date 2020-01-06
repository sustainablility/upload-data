let request = require('request-promise');
let config = require('../../config');
let log = require("../log");

async function checkDatasetName(datasetName) {

    let response = await request({
        uri: config.datasetManagementURL + "/checkDatasetNameExistence",
        qs: {
            datasetName: datasetName
        }
    }).catch(err => {
        log.fatal("Check Dataset Name existence failed", err);
        console.log(err);
    });
    if (response === undefined) {
        return null;
    }
    if (response === "0") {
        return false;
    }
    if (response === "1") {
        return true;
    }
    return null;
}

module.exports = checkDatasetName;