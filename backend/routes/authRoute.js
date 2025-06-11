import express from 'express'
const router = express.Router()
import { register, login, adminLogin, logout } from "../auth/auth.js";
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);

export default router;