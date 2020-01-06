let ex = require('express');
let app = ex();
let cors = require("cors");
let config = require('./config');
let multer = require('multer');
let upload = multer({
    storage: multer.memoryStorage()
});
app.use(cors());
app.post('/',upload.single("file"),require('./src/upload'));
app.listen(config.port);