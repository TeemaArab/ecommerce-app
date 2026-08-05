
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


// to generate token 
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for user login
const loginUser = async(req,res)=>{
   
}


//route for user registration

const registerUser = async(req,res)=>{
   try{
    const {name,email,password} = req.body;

    // checkin user already exists or not
    const userExists = await userModel.findOne({email});
    if(userExists){
        return res.json({success:false, message:'User already exists'})
    }
    // now validating email format & strong password
    if(!validator.isEmail(email)){
        return res.json({success:false, message:'Invalid email format'})
    }

      if(password.length < 8 ){
        return res.json({success:false, message:'Please enter a strong password with minimum 8 characters'})
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a new user
    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })

    const user = await newUser.save();

    //create a token
    const token = createToken(user._id);
      res.json({success:true, message:'User registered successfully', token})

   }catch(error){
    console.log(error);
    return res.json({success:false, message:error.message})
   }
}

//route for admin login
const adminLogin = async(req,res) =>{

}


export {loginUser, registerUser, adminLogin};