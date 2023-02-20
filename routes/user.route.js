const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user.model');
const { checkEmailRegister, checkEmailLogin } = require('../middlewares/checkEmail');
const { matchPassword } = require('../middlewares/matchPassword');

require('dotenv').config();         //enabling environment variables

const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.send("User Page")
})

userRouter.post('/register',checkEmailRegister,async (req,res)=>{
    const {email, password, name, city, age, gender} = req.body;
    const userDetails = {name, email, city , age, gender};
    try{
        bcrypt.hash(password,Number(process.env.salt),async (err,encrypt)=>{
            if(err){
                res.status(400).send({message : 'Bad request', error : err.message});
            }
            else{
                userDetails.password = encrypt;
                const newUser = new UserModel(userDetails);
                await newUser.save();
                res.status(200).send({message : "User has been registered!"});
            }
        })
    }
    catch(err){
        res.status(500).send({message : "Not able to register user", error :err.message})
    }
})

userRouter.post('/login',checkEmailLogin,matchPassword,async (req,res)=>{
    const {email} = req.body;
    try{
        const matchedData = await UserModel.findOne({email});
        const token = jwt.sign({id : matchedData['_id']},process.env.jwtKey);
        res.status(200).send({message : "Login Successful!",token});
    }
    catch(err){
        res.status(500).send({message : "Something Went Wrong", error : err.message});
    }
})


module.exports = {
    userRouter
}