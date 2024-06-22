import express from 'express';
import Productcontroller from './productController.js';
import { uploadfile } from '../../Middleware/fileUploadMiddleware.js';
const ProductRouter = express.Router();


const productController = new Productcontroller();

ProductRouter.get('/', productController.getAllProduct);
ProductRouter.post('/', uploadfile.single('imgUrl'), productController.addProduct);


export default ProductRouter;