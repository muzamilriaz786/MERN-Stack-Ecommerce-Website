import express from "express";
import upload from "../multer/multer.js"; // make sure multer.js has `export default upload`
import {
  saveProducts,
  getProducts,
  deleteProducts,
  updateProducts,
} from "../controllers/ProductControllers.js";
const router = express.Router();

router.post("/upload-product", upload.single("image"), saveProducts);
router.get("/products", getProducts);
router.put("/updateProducts/:id",upload.single('image'), updateProducts);
router.delete("/deleteProducts/:id", deleteProducts);
export default router;
