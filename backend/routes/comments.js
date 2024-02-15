const express = require("express");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");
const verifyToken = require("../verifyToken.js");

const router = express.Router();

//Create
router.post("/create" ,verifyToken, async(req,res)=>{
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Update
router.put("/:id",verifyToken, async(req,res)=>{
    try {  
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id",verifyToken, async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment Has Been Deleted");
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

//Get All Comments of a Post
router.get("/post/:postId",  async(req,res)=>{
    try {
        const allPostComments = await Comment.find({postId:req.params.postId});
        res.status(200).json(allPostComments);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
