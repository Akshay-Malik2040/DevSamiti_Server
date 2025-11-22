const express=require('express');
const profileRouter=express.Router();
const userAuth=require('../middleware/auth')
const {profile,profileEdit}=require('../controllers/profileController')

profileRouter.get('/profile',userAuth,profile)
profileRouter.patch('/profile/edit',userAuth,profileEdit)

module.exports=profileRouter