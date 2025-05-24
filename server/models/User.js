import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cartItems: {
    type: Object,
    default: {}
  },

  // cartItems: {
  //   type: Object.Schema.Types.ObjectId,
  //   ref: 'CartItems',
  //   required: true
  // },

},{minimize: false});

const  User = mongoose.models.user || mongoose.model('user',userSchema)

export default User;