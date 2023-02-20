const express = require('express');
const cors = require('cors')
const { connection } = require('./db');
const { postRouter } = require('./routes/post.route');
const { userRouter } = require('./routes/user.route');

require('dotenv').config()

const app = express();

//JSON
app.use(express.json());

//CORS
app.use(cors());

//Routes
app.use('/users',userRouter);
app.use('/posts',postRouter)


//Listening on PORT 
app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log('Connected to DB!'); 
    }
    catch(err){
        console.log('Error Connecting to DB!');
    }
    console.log(`Running at port ${process.env.port}`)
})