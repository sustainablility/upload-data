let csvFileHandle = require('./csvFileHandle');
let log = require('./log');
let getUserInfoByUserToken = require('./comunicateWithOtherServer/getUserInfoByUserToken');
let newDatasetManagementRecord = require('./comunicateWithOtherServer/newDatasetManagementRecord');
let isDatasetNameExisted = require('./comunicateWithOtherServer/checkDatasetNameExistenceInDatasetManagement');

async function upload(requests,response) {
    if (
        requests.body["datasetID"] === undefined ||
        requests.body["datasetType"] === undefined ||
        requests.body["publicity"] === undefined ||
        requests.body["metaData"] === undefined ||
        requests.body["userToken"] === undefined
    ) {
        response.status(400).send("Lack of parameters");
        return null;
    }

    if (!(requests.body["publicity"] === "0" || requests.body["publicity"] === "1")) {
        response.status(400).send("invalid publicity value");
        return null;
    }

    if (!(
        requests.body["datasetType"] === "0" ||
        requests.body["datasetType"] === "1" ||
        requests.body["datasetType"] === "2" ||
        requests.body["datasetType"] === "3"
    )) {
        response.status(400).send("invalid dataset type value");
        return null;
    }

    let datasedID = requests.body["datasetID"];
    let datasetType = requests.body["datasetType"];
    let publicity = requests.body["publicity"];
    let metaData = requests.body["metaData"];
    let userToken = requests.body["userToken"];
    let csvString = requests.file.buffer.toString();
    let userInfo = await getUserInfoByUserToken(userToken);
    if (userInfo === null) {
        response.send("1");
        return null;
    }

    let datasetNameexistenceResult = await isDatasetNameExisted(datasedID);
    if (datasetNameexistenceResult === null) {
        response.send("Internal Error");
        return null;
    }
    if (datasetNameexistenceResult) {
        response.send("Dataset has already existed");
        return null;
    }

    if (!await newDatasetManagementRecord(datasedID, publicity, metaData, JSON.stringify([userInfo["id"]]), "[]")) {
        response.send("1");
        return null;

    }
    let handleResult = await csvFileHandle(csvString, datasedID, parseInt(datasetType));
    if (handleResult !== 0) {
        response.send("1");
        return null;
    }
    response.send("0");

}
module.exports = upload;