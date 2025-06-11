import Cart from '../models/cartModel.js'
export const cartSave = async (req, res) => {
  try {
    const { userId, tempUserId, items } = req.body;

    // Ensure at least one identifier exists
    if (!userId && !tempUserId) {
      return res
        .status(400)
        .json({ message: "userId or tempUserId is required" });
    }

    // Use userId if logged in, otherwise fallback to tempUserId
    const query = userId ? { userId } : { tempUserId };

    let cart = await Cart.findOne(query);

    if (cart) {
      cart.items = items;
      cart.updatedAt = new Date();
      await cart.save();
    } else {
      await Cart.create({
        userId: userId || null,
        tempUserId: tempUserId || null,
        items,
      });
    }

    res.status(200).json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error("Cart save error:", err);
    res.status(500).json({ message: "Error saving cart" });
  }
};
export const cartGet = async (req,res) => {
    
}
export const cartUpdate = async (req,res) => {
    
}
export const cartDelete = async (req,res) => {
    
}