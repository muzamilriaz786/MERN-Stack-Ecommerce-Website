import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number
})
const CartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [CartItemSchema],
});
const Cart = mongoose.model('Cart', CartSchema);
export default Cart;