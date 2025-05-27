import jwt from 'jsonwebtoken';

const authSeller = (req,res,next)=>{
  const {sellerToken} = req.cookies;

  if(!sellerToken){
    return res.json({success: false, message: 'Not Authorized'});
  }
  try {
      const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
      if(tokenDecode.email === process.env.SELLER_EMAIL){
        next();
      }else{
        return res.json({success: false,message: 'Not Authorized'});
      }
    } catch (e) {
      console.log('authSeller error',e.message);
      return res.json({success: false, message: e.message});
    }
}

export default authSeller;