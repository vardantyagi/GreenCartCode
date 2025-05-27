import User from "../models/User.js";
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register user : /api/user/register
export const register = async(req,res)=>{
  try {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.json({success: false, message: 'Missing Details'})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
      return res.json({success: false, message: 'User already exists'})
    }

    let saltRounds = 10; // no. of times the bcrypt hash function will be called
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
      maxAge: 7*24*60*60*1000, // Cookie expiration time
    })

    return res.json({success: true, user: {email: user.email, name:user.name}});

  } catch (e) {
    console.log('userController register error',e.message);
    res.json({success: false, message: e.message});
  }
}

// login user : /api/user/login
export const login = async(req,res)=>{
  try {
    const {email,password} = req.body;

    if(!email || !password){
      return res.json({success: false, message: 'Email and password are required'})
    }

    let user = await User.findOne({email});

    if(!user){
      return res.json({success: false, message: 'User Not Found.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.json({success: false, message: 'Invalid email or password.'});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7*24*60*60*1000,
    })

    return res.json({success: true, user: {email: user.email, name:user.name}});

  } catch (e) {
    console.log('userController login error',e.message);
    res.json({success: false, message: e.message});
  }
}

// check auth: /api/user/is-auth
export const isAuth = async(req,res)=>{
  try {
    // const {userId} = req.body;
    const {userId} = req;    
    const user = await User.findById(userId).select('-password'); // exclude password
    res.json({success: true, user});
  } catch (e) {
    console.log('userController check auth error',e.message);
    res.json({success: false, message: e.message});
  }
}

// logout user: /api/user/logout
export const logout = async(req,res)=>{
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    return res.json({success: true, message: "Logged Out"});
  } catch (e) {
    console.log('userController logout error',e.message);
    res.json({success: false, message: e.message});
  }
}