const { UserModel } = require("../models/user.model")
const bcrypt = require('bcrypt');


const matchPassword = async (req,res,next)=>{
    const {email,password} = req.body
    try{
        const matchedData = await UserModel.findOne({email});
        bcrypt.compare(password,matchedData.password,(err,result)=>{
            if(err){
                res.status(400).send({message : "Something went Wrong!", error : err.message});
            }
            else if(!result){
                res.status(404).send({message : "Wrong Password!"});
            }
            else{
                next();
            }
        })
    }
    catch(err){
        res.status(500).send({message:  "Something Went Wrong!", error : err.message});
    }
}

module.exports = {
    matchPassword
}