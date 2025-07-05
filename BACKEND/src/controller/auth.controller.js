import { loginUser, registerUser } from "../services/auth.service.js";
import cookieParser from "cookie-parser";
import { cookieOptions } from "../config/config.js";
import wrapAsync from '../utils/tryCatchWrapper.js'

export const register_User = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        const { token, newUser } = await registerUser(name, email, password);
        req.user = newUser;
        res.cookie("accessToken", token, cookieOptions);
        res.status(201).json({ user: newUser, message: "User registered successfully" });
    } catch (err) {
        next(err);
    }
}


export const login_User = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        req.user = user;
        res.cookie("accessToken", token, cookieOptions);
        res.status(200).json({ user: user, message: "User logged in successfully" });
    }catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: "Invalid email or password" }); // ✅ Send response
  }
}
export const logout_User = (req, res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({ message: "User logged out successfully" });
}

export const get_current_user = wrapAsync(async (req, res) => {
    res.status(200).json({ user: req.user })
})