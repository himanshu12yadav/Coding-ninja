const express = require('express');
const db = require('./config/mongoose');
const router = require('./router/index.router');

const app = express();

app.use(express.urlencoded());
app.use('/',router);

app.listen(4000, function(err){
    if (err){
        console.error(err);
        return;
    }

    console.log("Server running properly...");
})