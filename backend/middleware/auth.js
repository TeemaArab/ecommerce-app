import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

    //get token from headers
    const {token} = req.headers;

    if(!token){
        return res.json({success:false, message: 'not authorized, no token'})
    }

    try{
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decode.id;
      next();
    }catch(error){
        console.log(error);
      return res.json({success:false, message:error.message})
    }
}

export default authUser;