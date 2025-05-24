import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  offerPrice: {
    type: Number,
    required: true
  },
  image: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true,
    required: true
  },
},{timestamps: true});

const Product = mongoose.models.product || mongoose.model('product',productSchema);

export default Product;