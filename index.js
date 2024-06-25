
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import  ProductRouter from './src/Features/Product/productRoutes.js'
import UserRouter from './src/Features/User/UserRoutes.js';
// import basicAuthorizer from './src/Middleware/basicAuthMiddleware.js';
import jwtAuth from './src/Middleware/JwtAuthMiddleware.js';
const server = express();
const Port = process.env.PORT;

// use body parser

server.use(bodyParser.json());
// using basicAuth middleware
// server.use('/api/products', basicAuthorizer,ProductRouter);

// using jwt auth middleware
server.use('/api/products',jwtAuth ,ProductRouter);
server.use('/api/users',UserRouter);
server.get('/', (req, res) =>{
    res.send("we are logical");
});




server.listen(Port,(req,res)=>{
     console.log("yes we are fired on server no 8000")
});