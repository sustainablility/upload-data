let createConn = require('../../../src/model/createConnection');
let newColl = require('../../../src/model/newCollectionDatasetFromArray');
let assert = require('chai').assert;
let testname = "test-for-new-collection";
let testarray = [["First","Second","Third"],[1,2,3],[3,4,5],[4,5,6]];
let expectedResult = [
    {
        'First': 1,
        'Second': 2,
        'Third': 2
    }
    ,
    {
        'First': 3,
        'Second': 4,
        'Third': 5
    }
    ,
    {
        'First': 4,
        'Second': 5,
        'Third': 6
    }
];

describe("Unit test creating collection dataset from predefined array", function () {
    it("Should be no error",function (done) {
        Promise.resolve()

            // Connect to database
            .then(function () {
                return new Promise(function (resolve) {
                    createConn.connectToDatasetDatabase(function (err,db,finished) {
                        assert.equal(err,null,"Cannot Connect To database");
                        resolve({
                            db: db,
                            finished: finished
                        })
                    })
                })
            })

            // Create Collection
            .then(function (variables) {
                return new Promise(function (resolve) {
                    newColl.newCollection(testname,testarray,variables.db,(err) => {
                         assert.equal(err,null,"Unable to update");
                         resolve(variables);
                    })
                })
            })

            // Get Data from database
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.collection(testname).find({}).toArray(function (err,result) {
                        assert.equal(err,null,"Get data from database Failed");
                        variables.resultFromDatabase = result;
                        resolve(variables);
                    })
                })
            })

            // Delete testing data
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.collection(testname).drop(function (err,isDel) {
                        assert.equal(err,null,"Delete testing dataset failed");
                        assert.equal(isDel,true,"Delete testing dataset failed");
                        resolve(variables);
                    })
                })
            })

            // Verify the expected data and result data.
            .then(function (variables) {
                return new Promise(function (resolve) {
                    assert.equal(variables.resultFromDatabase.sort().toString(),expectedResult.sort().toString(),"Data does not match");
                    variables.finished();
                    done();
                })
            })
    })
});