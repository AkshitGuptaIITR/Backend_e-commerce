const jwt=require('jsonwebtoken');

exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
        //In the postman we will set up the authrization that will help us to check the token.
    //split will break the string in the array after the spaces so here we have used the 2nd element of the String that is after bearer.
    //Bearer gsfdafdsafsafsf dfdsf fdsfsf
    const token=req.headers.authorization.split(" ")[1];
    // console.log(token)
    //This will get the token key and that can be veified by the decode function.
    // console.log(token);
    //This shows that the token is been used
    
    jwt.verify(token , process.env.JWT_SECRECT, (err, decoded) => {
        // console.log(decoded)
        req.user = decoded;
    });
    // console.log(user1)
    }

    else{
        return res.status(400).json({message:"Authorization Required"});
    }
    next(); 
}

exports.userMiddleware = (req,res,next)=>{
    // console.log(user)
    if(req.user.role !== 'user'){
        return res.status(400).json({message:"User Access Denied!!"});
    }
    next();
}

exports.adminMiddleware = (req,res,next)=>{
    // console.log(decode)
   if(req.user.role !== 'admin'){
       return res.status(400).json({message:"Admin Access Denied!!"});
   }
   next(); 
}