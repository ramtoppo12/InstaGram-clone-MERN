const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../Middleware/requireLogin");
const Post = mongoose.model("POST");
const router = express.Router();


router.get("/allpost",(req,res)=>{
    Post.find().populate("postedBy","_id name email").then(posts=>{
        res.status(200).json({
            success:true,
            posts:posts
        })
    }).catch(err=>console.log(err));
})

router.post("/createpost", requireLogin, (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(422).json({
            success: false,
            error: "Please Add all field"
        })
    }
    else {
        req.user.password = undefined;
        const post = new Post({
            title,
            body,
            postedBy: req.user
        })
        post.save().then(result => {
            res.status(200).json({
                success: true,
                message: "New post succesfully added",
                post: result
            })
        }).catch(err => console.log(err))
    }
})


module.exports = router;