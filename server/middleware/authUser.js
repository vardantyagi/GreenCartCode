import jwt from 'jsonwebtoken';

const authUser = async(req,res,next)=>{
  const {token} = req.cookies;

  if(!token){
    return res.json({success: false, message: 'Not Authorized'});
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if(tokenDecode.id){
      // req.body.userId = tokenDecode.id;
      req.userId = tokenDecode.id;
      next();
    }else{
      return res.json({success: false,message: 'Not Authorized'});
    }
  } catch (e) {
    console.log('authUser error:',e.message);
    return res.json({success: false, message: e.message});
  }
}

export default authUser;

// 6:34:05