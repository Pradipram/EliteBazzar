import { Cart } from "../model/cartSchema.js";
import dotenv from "dotenv";
dotenv.config();

export const AddToCart = async(req,res) =>{
    try {
        const exist = await Cart.findOne({ id: req.params.id });
        if(exist) {
            return response.status(401).json({ message: 'Item is already added on your cart'});
        }
        const cart = req.body.cartData;
        const newUser = new Cart(cart);
        await newUser.save();
        res.status(200).json({ message: cart });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const removeFromCart = async(req,res) =>{
    try{
        await Cart.findOneAndDelete({id : req.params.id});
        res.status(200).json({msg : "product successfully deleted from cart"})
    }
    catch(err){
        res.status(500).json({msg : err.message});
    }
}

export const getAllCart = async(req,res) =>{
    try{
        let allCart =  await Cart.find({});
        res.status(200).json(allCart);
    }
    catch(err){
        res.status(500).json({msg : err.message});
    }
}

export const isLogin = (req,res,next) =>{
    var Login = req.body.Login;
    // console.log("middleware is called ");
    if(Login !== ''){
        console.log("Login",Login);
        next();
    }
    else{
        // alert("Login to Continue");
        // res.redirect(`${process.env.CLIENT_URL}`);
        res.status(201).json({msg : "Login to continue"});
    }
}