const express = require('express');

const app = express();
const router = require('./routers/index');
const port = 8000;
const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(express.static('assests'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/issue_tracker', router);

app.listen(port, function(err){
    if (err){
        console.error(err);
        return;
    }
    console.log("Server running properly")
});

