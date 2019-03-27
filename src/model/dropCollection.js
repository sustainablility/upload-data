let log = require('../log');


exports.dropCollection = dropCollection;
/**
 * Function for removing the dataset collection
 * @param db
 * @param datasetID
 * @param callback
 */
function dropCollection(db,datasetID,callback = () => {}) {
    db.dropCollection(datasetID,(err,isDrop) => {
        if (err) {
            log.fatal("Drop Collection Error",err);
            callback({
                msg: "Database Error"
            })
        } else {
            if (!isDrop) {
                log.error("Drop Collection Failed","Cannot drop the Collection");
                callback({
                    msg: "Drop Collection Failed"
                })
            }else {
                callback(null)
            }
        }
    })
}