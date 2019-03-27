let csvFileHandle = require('./csvFileHandle');
let log = require('./log');

exports.upload = (requests,response) => {
    let datasedID = requests.body.datasetID;
    let csvString = requests.file.buffer.toString();
    csvFileHandle.csvFileHandle(csvString,datasedID,(err) => {
        if (err) {
            log.error("Handle CSV file error",err);
        }
        response.send("");
    });
};