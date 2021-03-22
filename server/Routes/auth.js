const express = require("express");
const mongoose = require("mongoose");
const Users = mongoose.model("USERS");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/",(req,res)=>{
    res.send("Ram boi!!")
})

router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        res.status(400).json({
            success:false,
            Error:"Please Add all field"
        })
    }
    else{
        Users.findOne({email:email}).then((saveduser)=>{
            if(saveduser){
                return res.status(422).json({
                    Success:false,
                    error:"User already Exist!"
                })
            }
            else{
                bcrypt.hash(password,12).then(hasedpassword=>{
                         const users = new Users({
                    email,
                    password:hasedpassword,
                    name
                })
                users.save().then( user =>{
                    res.status(200).json({
                    Success:true,
                    Msg:"USer saved in db succesfully",
                    user:user
                })
                }
                    
                )
                })
               
               
            }
        })
    }
})


// login router

router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(422).json({
            success:false,
            err:"Invalid user and password"
        });
    }
    Users.findOne({email:email}).then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({
            success:false,
            err:"Invalid user and password"
        });
        }
        bcrypt.compare(password,saveduser.password).then(domatch=>{
            if(!domatch){
                return res.status(422).json({
                    success:false,
                    err:"Invalid user and password"
                })
            }
            else{
                return res.status(200).json({
                    success:true,
                    msg:"Welcome User",
                    saveduser:saveduser
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;