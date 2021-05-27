const mongoose=require("mongoose");
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trime:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    categoryImage:{
        type:String,
    },
    parentID:{
        type:String
    }
}, {timestamps:true});

module.exports = mongoose.model('Category',categorySchema);