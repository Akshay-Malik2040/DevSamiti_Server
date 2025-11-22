const express=require('express');
const { sendRequest } = require('../controllers/requestController');
const requestRouter=express.Router();
const userAuth =require('../middleware/auth')

requestRouter.post('/request/send/:status/:toUserId',userAuth,sendRequest);

module.exports=requestRouter