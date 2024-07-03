import express from 'express';
import Productcontroller from './productController.js';
import { uploadfile } from '../../Middleware/fileUploadMiddleware.js';
const ProductRouter = express.Router();


const productController = new Productcontroller();
ProductRouter.post('/rate', (req,res) =>{
    productController.rateProduct(req,res)
});
ProductRouter.get('/filter', (req,res)=>{
    productController.filterProducts(req,res)
});
ProductRouter.get('/', (req,res)=>{
    productController.getAllProduct(req,res)
});
ProductRouter.post('/', uploadfile.single('imgUrl'), (req,res)=>{
    productController.addProduct(req,res)
});
ProductRouter.get('/:id', (req,res)=>{
    productController.getOneproduct(req,res)
});



export default ProductRouter;