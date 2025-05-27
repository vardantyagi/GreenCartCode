import Address from "../models/Address.js";

// add address : /api/address/add
export const addAddress = async(req,res)=>{
  try {
    const {userId} = req;
    const {address} = req.body;
    await Address.create({...address,userId});
    res.json({success: true, message: 'Addresss added successfully'});
  } catch (e) {
    console.log('addAddress error:',e.message);
    return res.json({success: false, message: e.message});
  }
}

// get address: /api/address/get
export const getAddress = async(req,res)=>{
  try {
    const {userId} = req;      
    const addresses = await Address.find({userId});
    res.json({success: true, addresses});
  } catch (e) {
    console.log('getAddress error:',e.message);
    return res.json({success: false, message: e.message});
  }
}