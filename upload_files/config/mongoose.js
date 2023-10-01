const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/csv_reader_app');

const db = mongoose.connection;

db.on('error', function(err){
    console.error(err);
});

db.once('open', function(){
    console.log("database connected")
});
