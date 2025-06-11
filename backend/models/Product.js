import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    // If you're storing different color options with images
    type: [
      {
        name: String,
        image: String,
      },
    ],
    default: [],
  },
  weight: {
    type: [String],
    default: [], // or Number, depending on format (e.g., "1kg" or 1000)
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
