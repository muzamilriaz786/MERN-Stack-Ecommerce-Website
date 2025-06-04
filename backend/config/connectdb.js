import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/react+node-ecommerce')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB')
    }
}
export default connectdb;