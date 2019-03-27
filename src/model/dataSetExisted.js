let log = require('../log');

exports.isDatasetExisted = isDatasetExisted;

/**
 * Check if dataset existed in database
 * @param db
 * @param datasetID
 * @param callback
 *
 * Callback function's parameters format: (err,isExisted)
 */
function isDatasetExisted(db,datasetID,callback = () => {}) {
    db.listCollections({
        name: datasetID
    }).toArray((err,result) => {
        if (err) {
            log.fatal("Dataset existence verify failed");
            callback({
                msg: "Database Error"
            },null);
        }else {
            if (result.length > 0) {
                callback(null,true);
            } else {
                callback(null,false);
            }
        }
    })
}
