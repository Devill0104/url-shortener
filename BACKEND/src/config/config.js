import jsonwebtoken from 'jsonwebtoken';

export const cookieOptions = {
    maxAge: 1000 * 60 * 60, 
    httpOnly: true,
    secure:false, 
    sameSite: 'lax', 
}
export const verifyToken = (token) => {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET)
}