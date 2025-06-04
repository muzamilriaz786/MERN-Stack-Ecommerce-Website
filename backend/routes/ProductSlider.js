import express from "express"
const router = express.Router()
import upload from "../multer/multer.js"; // make sure multer.js has `export default upload`

import {
  saveSlidePosts,
  getSlidePosts,
  updateSlidePost,
  deleteSlidePost,
} from "../controllers/ProductSliderController.js"; 

router.post("/addSlidePosts", upload.single("image"), saveSlidePosts);
router.get("/getSlidesPost", getSlidePosts);
router.put("/updateSlidesPost/:id",upload.single("image"), updateSlidePost);
router.delete("/deleteSlidesPost/:id", deleteSlidePost);

export default router;