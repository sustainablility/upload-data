let csv = require('csvtojson');
let Model = require('./model/index');
let arrayFormat = require('./arrayFormatByDataType');
let log = require('./log');
module.exports = csvFileHandle;
/**
 * Dealing with CSV file and store the dataset into database
 * @param csvString
 * @param dataSetID
 * @param type
 * @returns {null}
 */

async function csvFileHandle(csvString,dataSetID,type) {

    let rawArray = await csv({
        noheader:true,
        output: "csv"
    }).fromString(csvString);
    let formattedArray = arrayFormat(rawArray, type);
    let db = new Model();
    if (!await db.connect()) {
        db.done();
        return 1;
    }
    if (await db.dataSetExisted(dataSetID)) {
        db.done();
        return 2;
    }
    if (! await db.newCollectionDatasetFromArray(dataSetID, formattedArray)) {
        db.done();
        return 3;
    }
    db.done();
    return 0;

}