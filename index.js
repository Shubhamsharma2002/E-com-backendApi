
import express from 'express';
import 'dotenv/config';
import  ProductRouter from './src/Features/Product/productRoutes.js'
const server = express();
const Port = process.env.PORT;



server.get('/', (req, res) =>{
    res.send("we are logical");
});


server.use('/api/products/', ProductRouter)

server.listen(Port,(req,res)=>{
     console.log("yes we are fired on server no 8000")
});