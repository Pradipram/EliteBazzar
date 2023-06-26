import express from  'express';
import dotenv from "dotenv"
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { checkout, paymentVerification } from '../controller/razorpayController.js';
import { AddToCart, getAllCart, isLogin, removeFromCart } from '../controller/cart-controller.js';

const router = express.Router();
dotenv.config();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.get('/cart',isLogin,getAllCart);
router.post('/cart/:id',isLogin,AddToCart);
router.delete('/cart/:id',isLogin,removeFromCart);


router.post('/checkout',checkout);
router.post('/paymentverification',paymentVerification);
router.get('/getkey',(req,res) =>{
    res.status(200).json({key : process.env.RAZORPAY_API_KEY})
});

export default router;