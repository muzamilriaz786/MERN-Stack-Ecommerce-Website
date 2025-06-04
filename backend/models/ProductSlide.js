import mongoose from "mongoose";

const ProductSlide = new mongoose.Schema({
  slideTitle: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  button: {
    text: String,
    url: String,
    style: { type: String, default: "primary" }, // e.g., primary, secondary, outline
    target: { type: String, enum: ["_self", "_blank"], default: "_self" },
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductSlideModel = mongoose.model('ProductSlide', ProductSlide);
export default ProductSlideModel;