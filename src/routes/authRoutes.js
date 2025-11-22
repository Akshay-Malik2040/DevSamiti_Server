const express = require('express');
const authRouter = express.Router();
const { signup, login } = require('../controllers/authController')

authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.post('/logout', (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Login first")
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.json({message:"Logout Successfully"})
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
})

module.exports = authRouter;