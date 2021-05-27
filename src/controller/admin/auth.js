//This file is for the admin authentication

const User = require("../../models/user");
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator');//To valid the request of the api

//Payload is the set of information that is tranfered through the post request on the server
//This is the admin api that is created for admin sign in and signout

exports.signup = (req,res)=>{

    User.findOne({ email: req.body.email })
    .exec((error,user)=>{
        if(user){
            return res.status(400).json({
                message:"Admin already registered"
            });
        }
        // console.log(req.body)
            
            const {
                firstName,
                lastName,
                email,
                password
            }=req.body;
            const _user=new User({ 
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role:"admin"
            });
            console.log(_user)
            _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:error
                })
            }
            if(data){
                const token= jwt.sign({_id: data._id,role: data.role},process.env.JWT_SECRECT,{expiresIn:"1h"});
                return res.status(201).json({
                    user:data,
                    token

                })
            }
            })
    });
}

exports.signin = (req,res)=>{
    User.findOne({ email: req.body.email})
    .exec((error,user)=>{
        if(error){
            return res.status(400).json( {error} );
        }
        if(user){
            if(user.authenticate(req.body.password) && user.role == "admin"){
                                //TOKEN
                //To manage the login Session the user sends a TOKEN
                //And the TOKEN helps to verify the user from the back-end
                //syntax
                // const token = jwt.sign(payload,Key to access the token,{expiresIn:'time duration of the token'})
                //In the token generation we can declare the time duration for which the user can access the token 
                //So this can be helpful in order to do terminate the login aur sign up process.

                const token= jwt.sign({_id: user._id,role: user.role},process.env.JWT_SECRECT,{expiresIn:"1h"});

                //Token has been created 
                //This token can be used in order to maintain the session of login and sign up
                
                const {
                    _id,
                    firstName,
                    LastName,
                    email,
                    role,
                    fullName
                } = user;

                res.cookie('token', token, {expiresIn: '1h'});

                //Format to use cookie is-- res.cookie('name of the cookie', value, object like expiresIn);

                res.status(200).json({
                    token,
                    user:{
                    _id,
                    firstName,
                    LastName,
                    email,
                    role,
                    fullName
                    }
                });
            }
            else{
                return res.status(400).json({
                    message: "Invalid Password"
                });                
            }
        // The authenticate function is in the models- user.js which also serches for the password there only.    
    }
        else{
            return res.status(400).json({message: "User not registered"});
        }
    });
}

exports.signout = (req,res) => {
    
    res.clearCookie('token');
    res.status(200).json({message:"SignOut Successfully"});

}
