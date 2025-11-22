const User=require('../models/User')
const Connection=require('../models/Connection')
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

    } catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports={requestReceived,userConnections}