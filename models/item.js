var mongoose = require('mongoose')
var Schema =mongoose.Schema

var blogItem = new Schema({
    name :{
        type : String,
        required : true
    },
    price : {
        type :String,
        required: true
    },
    stock :{
        type : Number,
        required : true
    },
    tags : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

var item =mongoose.model('Item',blogItem)
module.exports = item