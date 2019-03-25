let mysql = require("mysql");
let databaseConfig = require('../../config').mysqlConfig;
let conn = mysql.createConnection(databaseConfig.main);
exports.record = (filename,data) => {
    conn.connect();
    conn.query("SELECT * FROM `files`", )
};