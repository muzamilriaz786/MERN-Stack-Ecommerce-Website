import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required: true,  
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Product = mongoose.model("Products", ProductSchema);
export default Product;