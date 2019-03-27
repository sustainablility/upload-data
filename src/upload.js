let csvFileHandle = require('./csvFileHandle');
let log = require('./log');

exports.upload = (requests,response) => {
    let datasedID = requests.body.datasetID;
    let datasetType = requests.body.datasetType;
    let csvString = requests.file.buffer.toString();
    csvFileHandle.csvFileHandle(csvString,datasedID,parseInt(datasetType),(err) => {
        if (err) {
            log.error("Handle CSV file error",err);
        }
        response.send("");
    });
};