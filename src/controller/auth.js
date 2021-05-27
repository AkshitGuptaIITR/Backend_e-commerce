//This file is for the user authentication

const User = require("../models/user");
const jwt = require('jsonwebtoken')

//Payload is the set of information that is tranfered through the post request on the server

exports.signup = (req,res)=>{
    User.findOne({ email: req.body.email })
    .exec((error,user)=>{
        if(user){
            return res.status(400).json({
                message:"user already registered"
            });
        }
        console.log(req.body)
            
            const {
                firstName,
                lastName,
                email,
                password,
            }=req.body;
            const _user=new User({ 
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            console.log(_user)
            _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:error
                })
            }
            if(data){
                return res.status(201).json({
                    message:"User Registered Successfully!"
                })
                
            }
            else{
                return res.status(400).json({message:"error"});
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
            if(user.authenticate(req.body.password)){
                                //TOKEN
                //To manage the login Session the user sends a TOKEN
                //And the TOKEN helps to verify the user from the back-end
                //syntax
                // const token = jwt.sign(payload,Key to access the token,{expiresIn:'time duration of the token'})
                //In the token generation we can declare the time duration for which the user can access the token 
                //So this can be helpful in order to do terminate the login aur sign up process.

                const token= jwt.sign({_id: user._id, role:user.role },process.env.JWT_SECRECT,{expiresIn:"1h"});

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

