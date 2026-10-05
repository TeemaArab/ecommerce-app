import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing orders using COD method(cash on delivery)

const placeOrder = async(req,res) =>{
   try{
    const{userId, items,amount, address} = req.body;
    // create order data
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now(),
        
       
    }

    //create new order model
    const newOrder = new orderModel(orderData);
    //save order to database
    await newOrder.save();

    //clear cart data
    await userModel.findByIdAndUpdate(userId, {cartData:{}});

    // then send response to user
    res.json({success:true, message:"Order placed successfully"})

   }catch(error){
    console.error("Error placing order:", error);
    res.json({success:false, message:"Failed to place order"});
   }
}




// placing orders using stripe method
const placeOrderStripe = async(req,res) =>{

}



//display all orders on admin panel
const allOrders = async(req,res) =>{

}


//display all orders of a particular user
const userOrders = async(req,res) =>{

}

// update order status by admin
const updateOrderStatus = async(req,res) =>{

}


export {placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus};
