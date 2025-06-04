import Product from "../models/Product.js";

// Create and Save a new Product
export const saveProducts = async (req,res) => {
  console.log(req.body);
  try {
    const { title, shortDescription, price } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    if (!title || !shortDescription || !price || !image) {
      return res.status(400).json({
        message:
          "All fields (title, shortDescription, price, image) are required",
      });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    const newProduct = new Product({
      title,
      shortDescription,
      price: parsedPrice,
      image,
    });

    await newProduct.save();

    return res.status(200).json({ message: "Product Successfully Published" });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Failed to publish product" });
  }
};


// Get all products
export const getProducts = async (req,res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB

    // Optional: add full URL to image paths if you saved relative path in DB
    const host = req.protocol + "://" + req.get("host");
    const productsWithFullImageUrl = products.map((product) => ({
      ...product._doc,
      image: product.image ? host + "/" + product.image : null,
    }));

    res.json({ products: productsWithFullImageUrl });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { title, shortDescription, price } = req.body;
    const { id } = req.params;

    const updateData = { title, shortDescription, price };

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`; // or req.file.path depending on your setup
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
  
export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    const deletedProducts = await Product.findByIdAndDelete(id);
    res.json({ message: "Product Deleted Successfully" });
}
