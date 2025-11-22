const mongoose=require('mongoose');

const ConnectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    toUserId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['interested','accepted','rejected','ignored'],
         },
},{timestamps:true});

module.exports=mongoose.model("Connection",ConnectionSchema);
