const User =require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signup=async (req,res,next)=>{
    try{
        const {firstName,emailId,password}=req.body;
        if(!firstName || !emailId || !password) return res.status(400).json({message:"Missing Fields"});
        const existing=await User.findOne({emailId});
        if(existing) return res.status(400).json({message:"User Already Exist ! Try Login"});

        const saltRounds=parseInt(process.env.SALT_ROUNDS || '10');
        const hashed= await bcrypt.hash(password,saltRounds);
        const user=await User.create({...req.body,password:hashed});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d"});
        res.cookie("token",token)
        return res.json({user: { id: user._id, firstName: user.firstName, emailId: user.emailId }});
    } catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports={signup}