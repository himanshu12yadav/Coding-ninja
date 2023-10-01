const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    path:{
        type:String, 
        required:true
    },
    fileType:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;