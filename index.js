let ex = require('express');
let app = ex();
let cors = require("cors");
let multer = require('multer');
let upload = multer({
    storage: multer.memoryStorage()
});
app.use(cors());
app.post('/',upload.single("file"),require('./src/upload'));
app.listen(12345);