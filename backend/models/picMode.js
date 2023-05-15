const mongoose = require('mongoose');
const picSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    pic : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        required : true,
        default : 0
    },
    id : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
})
const picModel = mongoose.model('picModel',picSchema) ;
module.exports = picModel;
