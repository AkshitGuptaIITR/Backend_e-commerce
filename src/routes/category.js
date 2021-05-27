const express = require('express');
const { requireSignin, adminMiddleware, userMiddleware } = require('../common');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const shortid = require('shortid');
const {addCategory, getCategory} = require('../controller/category');

// const {addCategory, getCategory} = require('../controller/category');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getcategory',getCategory);

module.exports = router;