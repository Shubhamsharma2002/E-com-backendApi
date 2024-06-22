
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import  ProductRouter from './src/Features/Product/productRoutes.js'
const server = express();
const Port = process.env.PORT;

// use body parser

server.use(bodyParser.json());

server.get('/', (req, res) =>{
    res.send("we are logical");
});


server.use('/api/products/', ProductRouter)

server.listen(Port,(req,res)=>{
     console.log("yes we are fired on server no 8000")
});