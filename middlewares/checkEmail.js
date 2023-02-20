const { UserModel } = require("../models/user.model");


const checkEmailRegister = async (req,res,next)=>{
    const {email} = req.body;
    try{
        const matchedData = await UserModel.findOne({email});
        if(matchedData){
            res.status(400).send({message : "User has already registered. Please Login!"})
        }
        else{
            next();
        }
    }
    catch(err){
        res.status(500).send({message : 'Something Went Wrong!' , error : err.message});
    }
}

const checkEmailLogin = async (req,res,next)=>{
    const {email} = req.body;
    try{
        const matchedData = await UserModel.findOne({email});
        if(!matchedData){
            res.status(400).send({message : "Email not registered. Please Register!"})
        }
        else{
            next();
        }
    }
    catch(err){
        res.status(500).send({message : 'Something Went Wrong!' , error : err.message});
    }
}

module.exports = {
    checkEmailRegister,
    checkEmailLogin
}