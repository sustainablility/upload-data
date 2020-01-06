let request = require('request-promise');
let config = require('../../config');
let encryption = require('../microservice-communication-encryption/index');
let log = require("../log");

async function getUserInfo(userToken) {

    let response = await request({
        uri: config.getUserInfoByUserTokenURL,
        qs: {
            token: userToken
        }
    }).catch(err => {
        log.fatal("Ger user information by token failed", err);
        console.log(err);
    });
    if (response === undefined) {
        return null;
    }
    if (response === "") {
        return "";
    }
    let userInfoJson = encryption.decrypt(response);
    return JSON.parse(userInfoJson);
}

module.exports = getUserInfo;