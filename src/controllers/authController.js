const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateSignUpData } = require('../utils/validation')

const signup = async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, emailId, password } = req.body;
        const existing = await User.findOne({ emailId });
        if (existing) return res.status(400).json({ message: "User Already Exist ! Try Login" });

        const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
        const hashed = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ ...req.body, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        res.cookie("token", token)
        return res.json({ message: "User created Successfully", user: { id: user._id, firstName: user.firstName, emailId: user.emailId } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) throw new Error("New User! Try Login");
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid) throw new Error("Invalid Credentials");
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN || "7d"});
        res.cookie("token",token);
        res.json({message:"Login successfully",user});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { signup,login }