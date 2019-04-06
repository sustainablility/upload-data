let createConnection = require('../../../src/model/createConnection');
let assert = require('chai').assert;

describe("Unit Test for creating connection to database", function () {
    it('should be no error in Dataset database', function (done) {

        Promise.resolve()

            // Connect to database
            .then(function () {
                return new Promise(function (resolve) {
                    createConnection.connectToDatasetDatabase(function (err,db,finished) {
                        assert.equal(err, null, "Database Connection Error");
                        resolve({
                            db: db,
                            finished: finished
                        })
                    })
                })
            })

            // Do something: create a collection
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.createCollection('testCreate',function (err) {
                        assert.equal(err,null,"Error in testing database function: Create Collection");
                        resolve(variables)
                    });
                })
            })

            // Remove testing collection
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.collection('testCreate').drop(function (err,isDrop) {
                        assert.equal(err,null,"Error in testing database function: Drop Collection");
                        assert.equal(isDrop,true,"Error in testing database function: Drop Collection. No error but has not dropped");
                        variables.finished();
                        done();
                    })
                })
            });
    });

    it('should be no error in Main database', function (done) {

        Promise.resolve()

            // Connect to database
            .then(function () {
                return new Promise(function (resolve) {
                    createConnection.connectToMainDatabase(function (err,db,finished) {
                        assert.equal(err, null, "Database Connection Error");
                        resolve({
                            db: db,
                            finished: finished
                        })
                    })
                })
            })

            // Do something: create a collection
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.createCollection('testCreate',function (err) {
                        assert.equal(err,null,"Error in testing database function: Create Collection");
                        resolve(variables)
                    });
                })
            })

            // Remove testing collection
            .then(function (variables) {
                return new Promise(function (resolve) {
                    variables.db.collection('testCreate').drop(function (err,isDrop) {
                        assert.equal(err,null,"Error in testing database function: Drop Collection");
                        assert.equal(isDrop,true,"Error in testing database function: Drop Collection. No error but has not dropped");
                        variables.finished();
                        done();
                    })
                })
            });
    });

});