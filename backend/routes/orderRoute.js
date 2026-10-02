 import express from "express";
import { allOrders,placeOrder, placeOrderStripe, updateOrderStatus, userOrders } from "../controllers/orderController.js";
import  adminAuth from "../middlewares/authMiddleware.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();


//create endpoints
//admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status/',adminAuth, updateOrderStatus);


//Payment features
orderRouter.post('/place',authUser, placeOrder); // for cash on delivery
orderRouter.post('/stripe',authUser, placeOrderStripe); // for stripe payment


//user features
orderRouter.post('/userOrder',authUser, userOrders);

export default orderRouter;