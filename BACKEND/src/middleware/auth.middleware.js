import { verifyToken } from "../config/config.js";
import { findUserById } from "../dao/user.dao.js";

// export const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.accessToken;
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     try {
//         const decoded = verifyToken(token); // decoded = { id: userId }
//         const user = await findUserById(decoded.id); // Use decoded.id
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         req.user = user;
        
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// }

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        req.user = null;  // No token → unauthenticated user
        return next();
    }

    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);

        if (!user) {
            req.user = null;  // Token invalid or user not found
        } else {
            req.user = user;  // Authenticated user
        }
    } catch (err) {
        req.user = null;  // Token error
    }

    next();  // Always forward the request
};
