const express = require('express');
const fileUpload = require('express-fileupload');
const csv = require('csv-parser');
const fs = require('fs');
const db = require('./config/mongoose');
const path = require('path');
const app = express();
const upload = require('./models/upload.models');
const port = 4000;

app.use(fileUpload());
app.use(express.static('assests'));
app.use(express.static('files'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('', async function(req, res){
    await upload.find({}).then(files =>{
        return res.render('index',{
            files:files
        });
    });
});

app.post('/upload', function(req, res){
    // console.log(req.files.foo);
    let sampleFile;
    let uploadPath;
    sampleFile = req.files.foo;
    uploadPath = path.join(__dirname + '/files/' + sampleFile.name);

   if (!req.files || Object.keys(req.files).length === 0){
        console.log('No files were upload');
        return;
    }

    // console.log(req.files.foo);


    upload.create({
        name:sampleFile.name,
        path:uploadPath,
        fileType:sampleFile.mimetype
    }).then(file =>{
        const result = [];
        sampleFile.mv(uploadPath, function(err){
            if (err){
                console.error(err);
                return;
            }
            console.log("File uploaded");
        });

        fs.createReadStream(`${path.join(__dirname + '/files/' + file.name)}`)
        .pipe(csv()).on('data', data =>{
            result.push(data);
        }).on('end', function(){
            console.log(result);
        });

        return res.redirect('/');
    })

});

app.use('/view', require('./routers/index.routers'));

app.listen(port, function(err){
    if (err){
        console.error(err);
        return;
    }
    console.log("Server running properly.");
})
