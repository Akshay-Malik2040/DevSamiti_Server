const Connection=require('../models/Connection')

const sendRequest=async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=['ignored','interested'];
        if(!allowedStatus.includes(status)) throw new Error("Invalid Status");

        const connection=await Connection.create({toUserId,fromUserId,status});
        res.json({message:"Request Sent",connection});

    } catch(err){
        res.status(400).json({Error:err.message})
    }
}

module.exports={sendRequest}