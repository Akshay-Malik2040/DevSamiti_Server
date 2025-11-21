const express = require('express');
const app = express();
const { connectDB } = require("./config/db")
require("dotenv").config();

app.use(express.json());

app.use("/", (req, res) => {
    res.send("Hello Welcome to the server")
})

connectDB().then(() => {
    console.log("DB connected successfully")
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port 5000");
    })
})
