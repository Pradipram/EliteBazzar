//Libraries
import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import { v4 as uuid } from 'uuid';

//razorpay
import Razorpay from "razorpay";

//Components
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import router from "./routes/route.js";


dotenv.config();
const app = express();
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',router);


//Razorpay stuff
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


//creating server and connectiong it to database
const PORT = process.env.PORT;
Connection();
app.listen(PORT, ()=> console.log(`server is running successfully on PORT ${PORT}`));
// DefaultData();