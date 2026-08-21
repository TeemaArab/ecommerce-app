import express from 'express';
import { addproduct, removeProduct, listProducts, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

//creating router
const productRouter = express.Router();

// router for adding a new product
productRouter.post('/add',adminAuth,upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]), addproduct);

productRouter.get('/list', listProducts);

productRouter.delete('/remove/:id',adminAuth, removeProduct);

productRouter.get('/single/:id', singleProduct);

export default productRouter;