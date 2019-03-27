let assert = require('chai').assert;
let csvFileHandle = require('../../src/csvFileHandle');
let newConnection = require('../../src/model/createConnection');
let collectionExited = require('../../src/model/dataSetExisted');
let dropCollection = require('../../src/model/dropCollection');

let testingCsvString = "first,second,third\n1,2,3\nhi,im,here\n4,5,6";
let testingDatasetID = "CSVHandlingTest";

describe("Integrate test for handling the csv file, verifying dataset existence, and dropping the dataset",function () {

    it('should be no error', function (done) {

        // Call the CSV handling function; create a new dataset
        Promise.resolve()
            .then(function () {
                return new Promise(function (resolve) {
                    csvFileHandle.csvFileHandle(testingCsvString,testingDatasetID,function (err) {
                        assert.equal(err,null,"Error in CSV handling");
                        resolve();
                    })
                })
            })

            // Connect to database
            .then(function () {
                return new Promise(function (resolve) {
                    newConnection.connectToDatasetDatabase(function (err,db,finished) {
                        assert.equal(err,null,"Error in Database Connection");
                        resolve({
                            db: db,
                            finished: finished
                        })
                    })
                })
            })

            // Test if the dataset existed
            .then(function (variables) {
                return new Promise(function (resolve) {
                    collectionExited.isDatasetExisted(variables.db,testingDatasetID,function (err,isExisted) {
                        assert.equal(err,null,"Error in collection existence verification");
                        assert.equal(isExisted,true,"Collection " + testingDatasetID + " should be existed");
                        resolve(variables);
                    })
                })
            })

            // Drop dataset
            .then(function (variables) {
                return new Promise(function (resolve) {
                    dropCollection.dropCollection(variables.db,testingDatasetID,function (err) {
                        assert.equal(err,null,"Error in dropping the collection ");
                        resolve(variables);
                    })
                })
            })

            // Test again if dataset existed
            .then(function (variables) {
                return new Promise(function () {
                    collectionExited.isDatasetExisted(variables.db,testingDatasetID,function (err,isExisted) {
                        assert.equal(err,null,"Error in collection existence verification");
                        assert.equal(isExisted,false,"Collection " + testingDatasetID + " should not be existed");
                        variables.finished();
                        done();
                    })
                })
            })
    });
});