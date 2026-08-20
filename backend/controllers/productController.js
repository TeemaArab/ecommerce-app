import{v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// function to add a new product
const addproduct = async(req,res)=>{
  try{
    const {name, description,price, category, subCategory, sizes, bestseller} = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    //filter undefined images from the array
    const images =[image1, image2, image3, image4].filter((item)=>item!==undefined);

    //upload images to cloudinary
    const imagesUrl = await Promise.all(
        images.map(async(item) =>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
            return result.secure_url;
        })
    );
  
  const productData ={
    name,
    description,
    price:Number(price),
    category,
    subCategory,
    sizes:JSON.parse(sizes),
    bestseller: bestseller === 'true' ? true : false,
    image: imagesUrl,
    date: Date.now()
  }
  console.log(productData);

  // to add the product and save it to the database
  const product = new productModel(productData);
  await product.save();

  res.json({success:true, message:"Product added successfully"});

  }catch(error){
    console.log(error);
    res.json({success:false, message:error.message});
  }
}

// function for listing all products
const listProducts = async(req,res)=>{

}

//function to remove a product
const removeProduct = async(req,res)=>{

}


// function for a single product info
const singleProduct = async(req,res)=>{

}


export {addproduct, listProducts, removeProduct, singleProduct}