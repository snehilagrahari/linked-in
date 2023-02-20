const express = require('express');
const { authenticator } = require('../middlewares/authenticator');
const { PostModel } = require('../models/post.model');

const postRouter = express.Router();

postRouter.get('/',authenticator,async (req,res)=>{
    const id = req.body.id;
    try{
        const matchedData = await PostModel.find({userId: id,...req.query});
        res.status(200).send(matchedData);
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong", error : req.body.id});
    }
})

postRouter.post('/create',authenticator,async (req,res)=>{
    const postDetails = req.body;
    try{
        const post = new PostModel({...postDetails, userId: req.body.id})
        await post.save();
        res.status(200).send({message:  "Posted successfully!"});
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong!", error : err.message});
    }
})

postRouter.get('/top',authenticator,async (req,res)=>{
    const id = req.body.id;
    try{
        const matchedData = await PostModel.find({userId : id}).sort({no_of_comments : -1});
        res.send(matchedData[0]);
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong!", error : err.message});
    }
})

postRouter.patch('/update/:id',authenticator,async (req,res)=>{
    const id = req.params.id;
    const {title, body, device, no_of_comments} = req.body;
    try{
        await PostModel.findByIdAndUpdate({_id : id},{title, body, device, no_of_comments});
        res.send({message : "Post Updated Succesfully"})
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong!", error : err.message});
    }
})

postRouter.delete('/delete/:id',authenticator,async (req,res)=>{
    const id = req.params.id;
    try{
        await PostModel.findByIdAndDelete({_id : id});
        res.send({message : "Post Deleted Succesfully"})
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong!", error : err.message});
    }
})

module.exports = {
    postRouter
}