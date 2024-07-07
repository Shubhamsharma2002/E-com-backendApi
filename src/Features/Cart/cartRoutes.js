import express from 'express';
import  {CartItemsController}  from './cartController.js';

const CartRouter = express.Router();


const cartItemsController = new CartItemsController();

CartRouter.delete('/:id',(req,res)=>{
    cartItemsController.delete(req,res)
});
CartRouter.post('/', (req,res)=>{
     cartItemsController.add(req,res)
});
CartRouter.get('/', (req,res)=>{
    cartItemsController.get(req,res)
});



export default CartRouter;