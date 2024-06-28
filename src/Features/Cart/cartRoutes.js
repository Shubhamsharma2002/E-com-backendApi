import express from 'express';
import  {CartItemsController}  from './cartController.js';

const CartRouter = express.Router();


const cartItemsController = new CartItemsController();

CartRouter.delete('/:id',cartItemsController.delete);
CartRouter.post('/', cartItemsController.add);
CartRouter.get('/', cartItemsController.get);



export default CartRouter;