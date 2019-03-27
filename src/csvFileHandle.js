let {convertCSVToArray} = require('convert-csv-to-array');
let newCollection = require('./model/newCollectionDatasetFromArray');
let createConnection = require('./model/createConnection');
let collectionExisted = require('./model/dataSetExisted');
let log = require('./log');

exports.csvFileHandle = csvFileHandle;

/**
 * Dealing with CSV file and store the dataset into database
 * @param csvString
 * @param dataSetID
 * @param callback
 * @returns {null}
 */

function csvFileHandle(csvString,dataSetID,callback = () => {}) {

    // Convert CSV to array
    let dataArray;
    try {
        dataArray = convertCSVToArray(csvString,{
            type: 'array',
            separator: ','
        });
    }
    catch (e) {
        log.error("CSV Parse error");
        callback({
            msg: "CSV Parse error"
        });
        return null;
    }

    Promise.resolve()

        // Connect to database
        .then(() => {
            return new Promise((resolve) => {
                createConnection.connectToDatasetDatabase((err,db,done) => {
                    if (err) {
                        callback({
                            msg: "Connect to database Failed"
                        });
                    }
                    resolve({
                        db: db,
                        done: done
                    })
                });
            })
        })

        // Verify dataset existence
        .then((variables) => {
            return new Promise((resolve) => {
                collectionExisted.isDatasetExisted(variables.db,dataSetID,(err,isExisted) => {
                    if (err) {
                        callback({
                            msg: "Dataset Existence Error"
                        })
                    }else {
                        if (isExisted) {
                            callback(null,false)
                        } else {
                            resolve(variables);
                        }
                    }
                })
            })
        })

        // Create Collection
        .then((variables) => {
            return new Promise((resolve) => {
                newCollection.newCollection(dataSetID,dataArray,variables.db,(err) => {
                    if (err) {
                        callback({
                            msg: "new collection failed"
                        })
                    }
                    resolve(variables);
                })
            })
        })

        // Done
        .then((variables) => {
            return new Promise(() => {
                variables.done();
                callback(null,true);
            })
        })
    ;
}