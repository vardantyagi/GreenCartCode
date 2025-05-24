import express from 'express';
import { addProducts, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(['images']), authSeller, addProducts);
productRouter.get('/list',productList);
productRouter.get('/id',productById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;