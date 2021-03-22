const express  = require("express");
const PORT = 5000;
const mongoose = require("mongoose");

const MONGOURI = require("./keys");

const app = express();

// mongoDB config
mongoose.connect(MONGOURI);

mongoose.connection.on("connected",()=>{
    console.log("MongoBD connected");
})
// middleware

app.get("/",(req,res)=>{
    res.send("hello World Ra,");
});

app.listen(PORT,()=>{
    console.log("App listening on localhost:5000");
})