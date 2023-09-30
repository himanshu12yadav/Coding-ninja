const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/admin_api');

const db = mongoose.connection;

db.on('error', function(err){
    console.error(err);
});

db.on('open', function(){
    console.log("Database connected");
});
