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
    profileImageUrl: {type:String},
    skills: {
        type: [String]
    },
    bio: {
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)