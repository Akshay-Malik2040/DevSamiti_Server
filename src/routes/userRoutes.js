const express=require('express');
const userAuth = require('../middleware/auth');
const userRouter=express.Router();
const {requestReceived,userConnections,feed}=require('../controllers/userController')

userRouter.get('/user/request/received',userAuth,requestReceived);
userRouter.get('/user/connections',userAuth,userConnections)
userRouter.get('/feed',userAuth,feed);

module.exports=userRouter;