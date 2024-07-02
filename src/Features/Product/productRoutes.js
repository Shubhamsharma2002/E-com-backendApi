import express from 'express';
import Productcontroller from './productController.js';
import { uploadfile } from '../../Middleware/fileUploadMiddleware.js';
const ProductRouter = express.Router();


const productController = new Productcontroller();
ProductRouter.post('/rate', productController.rateProduct);
ProductRouter.get('/filter', productController.filterProducts);
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