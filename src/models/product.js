const mongoose=require("mongoose");
const productSchema = new mongoose.Schema({
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
    price: {
        type:Number,
        required:true,
    },
    quantity :{
        type:Number,
        required:true
    },
    description: {
        type:String,
        required:true,
        trime:true,
    },
    offers: {
        type:Number
    },
    productPictures: [
        {img: { type:String} }
    ],
    review: [
        {
            userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    updatedAt:Date 

}, {timestamps:true});
//mongoose.schema.Types create the foreign key

module.exports = mongoose.model('Product',productSchema);