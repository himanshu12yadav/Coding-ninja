const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    label:[
        {
            type:String
        }
    ]
});


const Labels = mongoose.model('Label', labelSchema);

module.exports = Labels;