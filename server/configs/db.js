import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Datebase Connected"));
    await mongoose.connect(`${process.env.MONGODB_URL}/greencart`)
    // if (mongoose.connection.readyState !== 1) {
    //   return res.status(500).json({ success: false, message: "Database not connected" });
    // }    
  } catch (e) {
    console.error('mongo connection error');
    console.error(e.message);
  }
}

export default connectDB;