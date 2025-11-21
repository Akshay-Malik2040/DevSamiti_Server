const express=require('express');
const app=express();
require("dotenv").config();

app.use("/",(req,res)=>{
    res.send("Hello Welcome to the server")
})

app.listen(process.env.PORT,()=>{
    console.log("Server is listening on port 5000");
})