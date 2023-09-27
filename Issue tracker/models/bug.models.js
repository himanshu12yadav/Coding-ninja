const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    label:[{type:String}],
    author:{
        type:String,
        required:true
    },
    project:{
        type:mongoose.Types.ObjectId,
        ref:'Project',
    }
},{
    timestamps:true
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;