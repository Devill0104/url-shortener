import express from "express";
import { register_User, login_User, logout_User} from "../controller/auth.controller.js";
import {authMiddleware} from '../middleware/auth.middleware.js'
import { get_current_user } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, get_current_user);
router.post("/register", register_User);
router.post("/login", login_User);
router.get("/logout", logout_User);

export default router;