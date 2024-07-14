import express from 'express';
import Productcontroller from './productController.js';
import { uploadfile } from '../../Middleware/fileUploadMiddleware.js';
const ProductRouter = express.Router();


const productController = new Productcontroller();
ProductRouter.post('/rate', (req, res)=>{
    productController.rateProduct
});
ProductRouter.get('/filter', (req, res)=>{
    productController.filterProducts});
ProductRouter.get('/', (req, res)=>{
    productController.getAllProducts});
ProductRouter.post('/', uploadfile.single('imgUrl'), 
(req, res)=>{
    productController.addProduct
});
ProductRouter.get('/:id', (req, res)=>{
    productController.getOneProduct});



export default ProductRouter;