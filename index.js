let ex = require('express');
let app = ex();
let multer = require('multer');
let upload = multer({
    storage: multer.memoryStorage()
});

app.post('/',upload.single("file"),require('./src/upload').upload);
app.listen(8080);