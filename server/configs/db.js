import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Datebase Connected"));
    await mongoose.connect(`${process.env.MONGODB_URL}/greencart`)
  } catch (e) {
    console.error('mongo connection error');
    console.error(e.message);
  }
}

export default connectDB;