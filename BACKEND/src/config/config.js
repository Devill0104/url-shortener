import jsonwebtoken from 'jsonwebtoken';

export const cookieOptions = {
    maxAge: 1000 * 60 * 60, 
    httpOnly: true,
    secure:true, 
    // sameSite: 'lax', 
    sameSite: 'none', 
}
export const verifyToken = (token) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET)
} 