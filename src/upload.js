let csvFileHandle = require('./csvFileHandle');
let log = require('./log');

async function upload(requests,response) {
    let datasedID = requests.body["datasetID"];
    let datasetType = requests.body["datasetType"];
    let csvString = requests.file.buffer.toString();
    let handleResult = await csvFileHandle(csvString, datasedID, parseInt(datasetType));
    if (handleResult === 0) {
        response.send("0")
    } else {
        response.send("1");
    }
}
module.exports = upload;