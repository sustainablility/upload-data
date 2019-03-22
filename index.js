let ex = require('express');
let app = ex();
let multer = require('multer');
let path = require('path');
let upload = multer({
    dest: path.join(__dirname,'temp')
});


app.post('/',upload.single("file"),(request,response) => {
    console.log(request.file);
    response.send("");
});
app.listen(8080);