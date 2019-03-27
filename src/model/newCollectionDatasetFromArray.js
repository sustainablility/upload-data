let log = require('../log');

exports.newCollection = newCollection;

/**
 *  Create a new collection for dataset database with a specific array
 *
 *  Example array[][]
 *
 *  array[0][i] are the titles for each column
 *  rest of them are the data in dataset, just like the normal table.
 *
 *
 * @param datasetID dataset's ID
 * @param array dataset's array
 * @param db db object from database connection
 * @param callback callback
 */

function newCollection(datasetID,array,db,callback = () => {}) {
    Promise.resolve()
        .then(() => {
            return new Promise((resolve) => {
                db.createCollection(datasetID,(err) => {
                    if (err) {
                        log.fatal("Unable to Create a new Collection",err);
                        callback({
                            msg: "Unable to Create a new Collection"
                        })
                    }else {
                        resolve()
                    }
                });
            })
        })
        .then(() => {
            return new Promise((resolve) => {
                db.collection(datasetID).insertMany(parseArrayForDatabaseCollection(array),(err) => {
                    if (err) {
                        log.fatal("Unable to Insert the data", err);
                        callback({
                            msg: "Unable to Insert the data"
                        });
                    }else {
                        callback(null);
                        resolve();
                    }
                })
            })
        })
}

function parseArrayForDatabaseCollection(array) {
    let insertitems = [];
    for (let i = 1,ilen = array.length;i < ilen; i++) {
        let item = {};
        for (let j = 0,jlen = array[0].length;j < jlen; j ++) {
            item[array[0][j]] = array[i][j];
        }
        insertitems.push(item);
    }
    return insertitems;
}


function test() {
    let arr = [["First","Second","Third"],[1,2,3],[3,4,5],[4,5,6]];
    console.log(parseArrayForDatabaseCollection(arr));

}