import userModel from '../models/userModel.js';


// add products to user's cart



const addToCart = async (req, res) => {
    try{

        //step1: get user id, item id and size from request body
       //get user id form request body because we need to find out for whome, which item and what size of that item should be added
       const{userId, itemId, size} = req.body;

       //step2: find user by id and get that user'scart data
       const userData = await userModel.findById(userId); // find the user from database by the id and wait for the result
       let cartData = await userData.cartData; // get the cart data of that user

       //step3: check if the item already exists in the cart data, if yes then increase the quantity of that item by 1, if not then add that item to the cart data with quantity 1
       if(cartData[itemId]){
         if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
       }
       else{
        cartData[itemId][size] = 1; // if the item exists but the size doesn't exist, then add that size with quantity 1
       }
    }

    else{
        // if the item doesn't exist in the cart, add it with quantity 1
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
   // step 4:update and save user cart data in database
    await userModel.findByIdAndUpdate(userId, {cartData});
    //create response
    res.json({success:true, message: 'product added to cart successfully', cartData})

    }catch(error){
        console.error('Error adding to cart:', error);
        res.json({success: false, message: 'Error adding to cart'});
    }
}



// update user cart by adding or removing products
const updateCart = async (req, res) => {
     try{
    const {usrId, itemId, size, quantity} = req.body;
    const userId = await userModel.findById(usrId);
    let userData = await userId.cartData;

    // to update the quantity of the item in the cart
     cartData[itemId][size] = quantity;

     //save in the database
     await userModel.findByIdAndUpdate(usrId, {cartData});
     res.json({success:true, message: 'cart updated successfully', cartData})
  }catch(error){
    console.error('Error updating cart:', error);
    res.json({success: false, message: 'Error updating cart'});
  }
}

 

// get user cart data
const getUserCart = async (req, res) => {
    try{
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true, message: 'cart data fetched successfully', cartData})

    }catch(error0){
        console.error('Error fetching user cart:', error0);
        res.json({success: false, message: 'Error fetching user cart'});
    }
}


export {addToCart, updateCart, getUserCart}