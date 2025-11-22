const jwt=require('jsonwebtoken')
const User=require('../models/User')

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Not logged in");
        const decodedObj=await jwt.verify(token,process.env.JWT_SECRET);
        const{_id}=decodedObj;
        const user=await User.findOne({_id});
        if(!user) throw new Error("User not found");
        req.user=user;
        next();

    }catch(err){
        res.status(400).json({Error:err.message});
    }
}

module.exports = userAuth