
import express from 'express';
import dotenv from 'dotenv';
const server = express();
const Port = process.env.PORT;
server.get('/', (req, res) =>{
    res.send("we are logical");
});

server.listen(Port,(req,res)=>{
     console.log("yes we are fired on server no 8000")
});