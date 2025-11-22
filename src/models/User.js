const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    age: {type:Number},
    profileImageUrl: {type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    skills: {
        type: [String]
    },
    bio: {
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)