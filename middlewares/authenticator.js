const jwt = require('jsonwebtoken')

const authenticator = async (req,res,next)=>{
    const token = req.headers.authorization
    try{
        jwt.verify(token,process.env.jwtKey,(err,decrypted)=>{
            if(err)
                res.status(400).send({message : err.message})
            else{
                req.body.id=decrypted.id
                next();
            }
        })
    }
    catch(err){
        res.status(500).send({
            message : 'Something Went Wrong',
            error : err.message
        })
    }
}

module.exports ={
    authenticator
}