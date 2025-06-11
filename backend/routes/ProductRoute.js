import express from "express";
import upload from "../multer/multer.js"; // make sure multer.js has `export default upload`
import {
  saveProducts,
  getProducts,
  deleteProducts,
  updateProducts,
  getProductsById,
} from "../controllers/ProductControllers.js";
const router = express.Router();
import {isAuthenticated} from '../middleware/isLoginAuth.js'

router.post("/upload-product",isAuthenticated, upload.fields([
  { name: "image", maxCount: 1 },        // main product image
  { name: "colorImages", maxCount: 20 }, // color variant images
]),
(req, res, next) => {
  console.log(req.files, "files received");
  next();
  }, saveProducts);

router.get("/products", getProducts);

router.put("/updateProducts/:id",upload.fields([
  { name: "image", maxCount: 1 },        // main product image
  { name: "colorImages", maxCount: 20 }, // color variant images
]),
(req, res, next) => {
  console.log(req.files, "files updated");
  next();
  }, updateProducts);

router.delete("/deleteProducts/:id", deleteProducts);
export default router;


router.get("/products/:id", getProductsById);