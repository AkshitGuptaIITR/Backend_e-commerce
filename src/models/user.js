const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min:3,
        max:20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min:3,
        max:20
    },
    usename:{
        type: String,
        // required: true,
        trim: true,
        unique:true,
        index:true,
        lowercase:true,
        min:3,
        max:20
    },
    email:{
        type: String,
        required : true,
        trim:true,
        lowercase:true,
        unique: true
    },
    hash_password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber:{
        type:String
    },
    profilePicture:{
        type:String
    }
},
{timestamps:true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10); 
});

//This is the virtual key that is created to get the fullname of the user

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods={
    authenticate: function (password){
        return bcrypt.compareSync( password,this.hash_password );
        //This is used to authenticate the password that is to check the password.
    }
}



module.exports = mongoose.model('User', userSchema);