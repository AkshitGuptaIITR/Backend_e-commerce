const express = require('express');
const { requireSignin, adminMiddleware } = require('../common');
const { createProduct } = require('../controller/product');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const shortid = require('shortid');

// const {addCategory, getCategory} = require('../controller/category');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})

//path is the library that is used to determine the current path and join the request 
//storage is the variale that is create from the multer method diskStorage
//diskstorage is used to create the storage on the disk 
//diskStorage which take two arguments that is destination and filename
//the function is passed in the destination and filename
//In destination the file destination where we have to store is passed
//In filename the file name is given to the file which we want to save


const upload = multer({ storage });
//This will upload the file that is send to the database

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/category/getcategory',getCategory);

module.exports = router;