import express from 'express';
import Productcontroller from './productController.js';
const ProductRouter = express.Router();


const productController = new Productcontroller();

ProductRouter.get('/', productController.getAllProduct);


export default ProductRouter;