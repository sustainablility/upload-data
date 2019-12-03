let Dbclass = require("../src/model/index");
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

describe('Model Test',function () {
   let db;
    it('Database Connection', function (done) {
        (
            async function() {
                db = new Dbclass();
                let connectionResult = await db.connect();
                if (!connectionResult) {
                    assert.fail("Connecting database error");
                }
                done();
            }
        )();
    });

    it('New Collection test', function (done) {
        (
            async function() {
                if (!await db.newCollectionDatasetFromArray(testname, testarray)) {
                    assert.fail("New Collection Error");
                }
                done();
            }
        )();
    });

    it('Dataset check test', function (done) {
        (
            async function() {
                let result = await db.dataSetExisted(testname);
                if (! result) {
                    assert.fail("Check dataset failed");
                }
                done()
            }
        )();
    });

    it('Dataset Delete', function (done) {
        (
            async function() {
                if (! await db.removeDataset(testname)) {
                    assert.fail("Delete Dataset Failed")
                }
                done();
            }
        )();
    });
});