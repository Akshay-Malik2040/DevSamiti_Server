const express=require('express');
const { sendRequest, reviewRequest } = require('../controllers/requestController');
const requestRouter=express.Router();
const userAuth =require('../middleware/auth')

requestRouter.post('/request/send/:status/:toUserId',userAuth,sendRequest);

requestRouter.post('/request/review/:status/:requestId',userAuth,reviewRequest)
module.exports=requestRouter