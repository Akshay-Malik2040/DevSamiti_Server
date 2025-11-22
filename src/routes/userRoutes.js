const express=require('express');
const userAuth = require('../middleware/auth');
const userRouter=express.Router();
const {requestReceived,userConnections}=require('../controllers/userController')

userRouter.get('/user/request/received',userAuth,requestReceived);
userRouter.get('/user/connections',userAuth,userConnections)

module.exports=userRouter;