import Product from "../models/Product.js";

// Create and Save a new Product
export const saveProducts = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      price,
      stock = 0,
      category = "",
      weight,
      color,
    } = req.body;

    // Access files arrays from req.files (multer multiple fields)
    // Take the first main image file from 'image' field array
    const mainImageFile = req.files?.image?.[0];
    if (!mainImageFile) {
      return res
        .status(400)
        .json({ message: "Main product image is required" });
    }
    const image =
      req.files && req.files.image && req.files.image[0]
        ? `uploads/${req.files.image[0].filename}`
        : null;
  

    // Parse price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    // Parse weight array
    let parsedWeight = [];
    if (weight) {
      try {
        parsedWeight = JSON.parse(weight);
        if (!Array.isArray(parsedWeight)) throw new Error();
      } catch {
        return res
          .status(400)
          .json({ message: "Weight must be a valid JSON array" });
      }
    }

    // Parse color array (metadata only, not images)
    let parsedColor = [];
    if (color) {
      try {
        parsedColor = JSON.parse(color);
        if (!Array.isArray(parsedColor)) throw new Error();
      } catch {
        return res
          .status(400)
          .json({ message: "Color must be a valid JSON array" });
      }
    }

    // Now map uploaded colorImages to parsedColor objects by index
    // Each item in parsedColor should get its corresponding image path added
    const colorImages = req.files?.colorImages || [];
    const colorsWithImages = parsedColor.map((colorObj, i) => {
      return {
        ...colorObj,
        image: colorImages[i] ? `uploads/${colorImages[i].filename}` : null,
      };
    });

    // Create and save product
    const newProduct = new Product({
      title,
      shortDescription,
      price: parsedPrice,
      stock: parseInt(stock, 10) || 0,
      category,
      weight: parsedWeight,
      color: colorsWithImages, // color array with images attached
      image,
    });

    await newProduct.save();

    return res.status(200).json({ message: "Product Successfully Published" });
  } catch (error) {
    console.error("Error saving product:", error);
    return res.status(500).json({ message: "Failed to publish product" });
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
    console.log("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      shortDescription,
      price,
      stock = 0,
      category = "",
      weight,
      color,
    } = req.body;

    // Prepare update object
    const updateData = {
      title,
      shortDescription,
      category,
      stock: parseInt(stock, 10) || 0,
    };

    // Parse price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }
    updateData.price = parsedPrice;

    // Parse weight array
    if (weight) {
      try {
        const parsedWeight = JSON.parse(weight);
        if (!Array.isArray(parsedWeight))
          throw new Error("Weight must be an array");
        updateData.weight = parsedWeight;
      } catch {
        return res.status(400).json({
          message: "Weight must be a valid JSON array",
        });
      }
    }

    // Parse color array (metadata only, not images)
    let parsedColor = [];
    if (color) {
      try {
        parsedColor = JSON.parse(color);
        if (!Array.isArray(parsedColor)) throw new Error();
      } catch {
        return res.status(400).json({
          message: "Color must be a valid JSON array",
        });
      }
    }

    // Handle images in req.files (multer multiple fields)
    // Main image (single file)
    if (req.files?.image && req.files.image.length > 0) {
      updateData.image = `uploads/${req.files.image[0].filename}`;
    }

    // Color images (multiple files)
    const colorImages = req.files?.colorImages || [];
    // Combine parsedColor metadata with new images
    const colorsWithImages = parsedColor.map((colorObj, i) => {
      return {
        ...colorObj,
        image: colorImages[i]
          ? `uploads/${colorImages[i].filename}`
          : colorObj.image || null, // keep existing image if no new one provided
      };
    });
    updateData.color = colorsWithImages;

    // Update the product document in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

  
export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    const deletedProducts = await Product.findByIdAndDelete(id);
    res.json({ message: "Product Deleted Successfully" });
}


export const getProductsById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Build full host URL (http://localhost:3000 or your domain)
    const host = req.protocol + "://" + req.get("host");

    // Construct product with full URLs for main image and color images
    const productWithFullImageUrls = {
      ...product._doc,
      image: product.image ? host + "/" + product.image : null,
      color: product.color.map((c) => ({
        ...c,
        image: c.image ? host + "/" + c.image : null,
      })),
    };

    res.json(productWithFullImageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
