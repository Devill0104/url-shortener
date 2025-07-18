import { nanoid } from "nanoid"
import jsonwebtoken from "jsonwebtoken";


export const generateNanoId = (length)=>{
    return nanoid(length);
}

export const signToken = (payload)=>{ 
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}