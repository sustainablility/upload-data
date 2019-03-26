let {convertCSVToArray} = require('convert-csv-to-array');

exports.upload = (requests,response) => {
    let dataArray = convertCSVToArray(requests.file.buffer.toString(),{
        type: 'array',
        separator: ','
    });
    let datasetName = requests.body.datasetName;
    console.log(datasetName);
    console.log(dataArray);

    response.send("");
};