import User from "../models/User.js";

// update user cartData: /api/cart/update
export const updateCart = async(req,res)=>{
  try {
    const {cartItems} = req.body;
    const {userId} = req;
    await User.findByIdAndUpdate(userId,{cartItems},{new: true});
    res.json({success: true, message: 'Cart Updated'})
  } catch (e) {
    console.log('cartController error:', e.message);
    res.json({ success: false, message: e.message });
  }
}