const express=require('express');
const { requireSignin } = require('../../common');
const router= express.Router();
const { signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated,validateSigninRequest } = require('../../Validators/auth');

//Here the check is the pre denied function which have methods so to have the vadition process with the message and check the valid information

router.post('/admin/signup', validateSignupRequest , isRequestValidated ,signup);
router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin);
router.post('/admin/signout', signout);

//This is for the sign up button and code to create the sign up

//user api post requset
//normal request that will post the value

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user:'profile'});
// })

module.exports = router;