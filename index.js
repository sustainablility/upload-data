let ex = require('express');
let app = ex();
let multer = require('multer');
let upload = multer({
    storage: multer.memoryStorage()
});
let {convertCSVToArray} = require('convert-csv-to-array');

app.post('/',upload.single("file"),(request,response) => {
    let dataArray = convertCSVToArray(request.file.buffer.toString(),{
        type: 'array',
        separator: ','
    });
    console.log(dataArray);
    response.send("");
});
app.listen(8080);