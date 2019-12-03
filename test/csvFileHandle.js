let assert = require('chai').assert;
let csvFileHandle = require('../src/csvFileHandle');
let Model = require('../src/model/index');

let testingCsvString = "first,second,third\n1,2,3\nhi,im,here\n4,5,6";
let testingDatasetID = "CSVHandlingTest";

describe("Integrate test for handling the csv file",function () {
    it('Test by CSV string', function (done) {
        (async function() {
            let result = await csvFileHandle(testingCsvString, testingDatasetID, 1);
            switch (result) {
                case 1:
                    assert.fail("Database connection error");
                case 2:
                    assert.fail("Dataset existed");
                case 3:
                    assert.fail("Cannot create dataset");
            }
            done();
        })();
    });

    it('Remove Testing dataset', function (done) {
        (
            async function() {
                let db = new Model();
                if (! await db.connect()) {
                    assert.fail("Remove testing dataset error");
                }
                if (! await db.removeDataset(testingDatasetID)) {
                    assert.fail("Remove testing dataset error");
                }
                db.done();
                done();
            }
        )();
    });

});