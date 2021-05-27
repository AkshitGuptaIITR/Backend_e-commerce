//Here the validators are used to check and give the run time error that are performed by the user
//Here check is used to check the values of the elements of the database.

const {check, validationResult}= require('express-validator');

exports.validateSignupRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('first name is required'),

    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),

    check('email')
    .notEmpty()
    .withMessage('Valid email id is required'),
    
    check('password')
    .isLength({min:6})
    .withMessage('Password with at least 6 characters is required')

];

exports.validateSigninRequest=[
    check('Email')
    .isEmpty()
    .withMessage('Enter Your Registered Email id'),

    check('password')
    .isLength({min:6})
    .withMessage('Enter you 6 digit password')
];

exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({errors: errors.array()[0].msg});
    }
    else{
        return next();
    }
}