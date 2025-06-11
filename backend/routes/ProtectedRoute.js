import express from 'express'
const router = express.Router()
import { checkAuth } from '../middleware/check-auth.js';

router.get("/check-auth", checkAuth);

export default router;