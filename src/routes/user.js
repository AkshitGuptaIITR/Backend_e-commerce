const express=require('express');
const router= express.Router();
const { signup, signin } = require('../controller/auth');
const { isRequestValidated, validateSignupRequest,validateSigninRequest } = require('../Validators/auth');
const {requireSignin}= require("../common/index");

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

//This is for the sign up button and code to create the sign up

router.post('/signin',validateSigninRequest,isRequestValidated,signin);

//user api post requset
//normal request that will post the value

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'});
})
module.exports = router;