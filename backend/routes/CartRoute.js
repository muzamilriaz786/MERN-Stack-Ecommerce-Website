import express from 'express'
const router = express.Router()
import { cartSave } from "../controllers/CartController.js"

router.post('/saveCart',cartSave)

export default router;