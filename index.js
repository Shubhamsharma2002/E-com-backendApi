
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import  ProductRouter from './src/Features/Product/productRoutes.js'
import UserRouter from './src/Features/User/UserRoutes.js';
// import basicAuthorizer from './src/Middleware/basicAuthMiddleware.js';
import jwtAuth from './src/Middleware/JwtAuthMiddleware.js';
import CartRouter from './src/Features/Cart/cartRoutes.js';

//  swageer 2.0
// import apiDocs from './swagger.json'assert{type:'json'};
// swagger 3.0
import apiDocs from './swagger3.json'assert{type:'json'};

const server = express();
const Port = process.env.PORT;

// use body parser
server.use('/api-docs', swagger.serve,swagger.setup(apiDocs))
server.use(bodyParser.json());
// using basicAuth middleware
// server.use('/api/products', basicAuthorizer,ProductRouter);

// handling CORS policy way 1
// server.use((req,res)=>{
//     res.header('Access-Control-Allow-Origin','*');
//   res.header('Access-Control-Allow-Headers','*');
//   res.header('Access-Control-Allow-Methods','*');
//   // return ok for preflight request.
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// })

// handling CORS policy way 2

server.use(cors());
// using jwt auth middleware
server.use('/api/products',jwtAuth ,ProductRouter);
server.use('/api/cartitems',jwtAuth, CartRouter)
server.use('/api/users',UserRouter);
// handling 404 error
server.use((req,res)=>{
    res.status(404).send('api not found')
})

// errror handler midleware
server.use((err,req,res,next)=>{
    console.log(err);
    res.status(503).send('something went we will solve this')
})
server.get('/', (req, res) =>{
    res.send("we are logical");
});




server.listen(Port,(req,res)=>{
     console.log("yes we are fired on server no 8000")
});