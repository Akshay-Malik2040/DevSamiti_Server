const User=require('../models/User')
const Connection=require('../models/Connection')
USER_SAFE_DATA="firstName lastName gender age skills bio profileImageUrl"

const requestReceived=async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const requests=await Connection.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])

        res.json({message:"Connection Request For review",requests});
    } catch(err){
        res.status(400).json({Error: err.message});
    }
}

const userConnections=async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connections=await Connection.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {
                 toUserId:loggedInUser._id,status:"accepted"
                }
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        res.json({message:"Connections",connections})
    } catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports={requestReceived,userConnections}