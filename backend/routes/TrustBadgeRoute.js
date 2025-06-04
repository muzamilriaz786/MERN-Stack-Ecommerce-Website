import express from "express"
const router = express.Router()
import upload from "../multer/multer.js"; // make sure multer.js has `export default upload`

import {
  saveTrustBadges,
  getTrustBadges,
  updateTrustBadges,
  deleteTrustBadges,
} from "../controllers/TrustBadgeController.js";

router.post("/uploadTrustBadges",upload.single('image'), saveTrustBadges);
router.get("/getTrustBadges", getTrustBadges);
router.put("/updateTrustBadges/:id",upload.single('image'), updateTrustBadges);
router.delete("/deleteTrustBadges/:id", deleteTrustBadges);

export default router;