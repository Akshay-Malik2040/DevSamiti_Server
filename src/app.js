const express = require('express');
const app = express();
const { connectDB } = require("./config/db")
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/authRoutes')
const profileRouter=require('./routes/profileRoutes')
const requestRouter=require('./routes/requestRoutes')
const userRouter=require('./routes/userRoutes')
require("dotenv").config();

app.use(express.json());
app.use(cookieParser())

app.use("/", authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB().then(() => {
    console.log("DB connected successfully")
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port 5000");
    })
})
