import express from 'express';
import OrderController from './orderController.js';

const OroductRouter = express.Router();


const orderController = new OrderController();


OroductRouter.post('/', (req,res,next)=>{
    orderController.placeorder(req,res,next)
})




export default OroductRouter;