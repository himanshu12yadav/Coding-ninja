const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://himanshu:2022Himanshu@cluster0.0g6foej.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection;

db.on('error', function(err){
    console.error(err);
});

db.once('open', function(){
    console.log("database connected");
})

