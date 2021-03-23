const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../keys");
const mongoose = require("mongoose");
const Users =mongoose.model("USERS")


module.exports=(req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({
            success:false,
            error:"You must be Logged In first one"
        })
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({
                success:false,
                err:console.log(err)
            })
           
        }
        const {_id} = payload;
        Users.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}