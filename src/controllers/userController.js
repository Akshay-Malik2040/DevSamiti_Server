const User=require('../models/User')
const Connection=require('../models/Connection');
const { reviewRequest } = require('./requestController');
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

const feed=async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const skip=(page-1)*limit
        const connectionRequest=await Connection.find({
            $or:[
                {
                    fromUserId:loggedInUser._id
                },
                {
                    toUserId:loggedInUser._id
                }
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed=new Set();
        connectionRequest.forEach(request=>{
            hideUserFromFeed.add(request.fromUserId.toString())
            hideUserFromFeed.add(request.toUserId.toString())
        })

         const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({message:"feed",users});
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

module.exports={requestReceived,userConnections,feed}