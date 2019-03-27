let csv = require('csvtojson');
let newCollection = require('./model/newCollectionDatasetFromArray');
let createConnection = require('./model/createConnection');
let collectionExisted = require('./model/dataSetExisted');
let arrayFormat = require('./arrayFormatByDataType');
let log = require('./log');

exports.csvFileHandle = csvFileHandle;

/**
 * Dealing with CSV file and store the dataset into database
 * @param csvString
 * @param dataSetID
 * @param type
 * @param callback
 * @returns {null}
 */

function csvFileHandle(csvString,dataSetID,type,callback = () => {}) {


    Promise.resolve()

        .then(() => {
            return new Promise((resolve) => {
                csv({
                    noheader:true,
                    output: "csv"
                }).fromString(csvString).then((rawArray)=>{
                    resolve(arrayFormat.arrayFormat(rawArray,type));
                })
            })
        })

        // Connect to database
        .then((dataArray) => {
            return new Promise((resolve) => {
                createConnection.connectToDatasetDatabase((err,db,done) => {
                    if (err) {
                        callback({
                            msg: "Connect to database Failed"
                        });
                    }
                    resolve({
                        db: db,
                        done: done,
                        dataArray: dataArray
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
                newCollection.newCollection(dataSetID,variables.dataArray,variables.db,(err) => {
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
            return new Promise((resolve) => {
                variables.done();
                callback(null,true);
                resolve()
            })
        })
    ;
}