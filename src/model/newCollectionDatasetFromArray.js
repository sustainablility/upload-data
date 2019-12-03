let log = require('../log');

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

async function newCollection(datasetID,array) {
    let createCollectionResult = await this.datasetDb.createCollection(datasetID).catch(err => {
        log.fatal("Cannot create collection", err);
    });
    if (createCollectionResult === undefined) {
        return false;
    }
    let fillCollectionResult = await this.datasetDb.collection(datasetID).insertMany(parseArrayForDatabaseCollection(array));
    if (fillCollectionResult.result.ok !== 1){
        return false;
    }
    return true;
}

module.exports = newCollection;

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