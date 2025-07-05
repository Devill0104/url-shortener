//authenticaton part for the user
import { signToken } from "../utils/helper.js";
import { createUser, findUserByEmailAndPassword } from "../dao/user.dao.js";  
import { ConflictError } from "../../errorHandler.js";
import { findUserByEmail } from "../dao/user.dao.js";


export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) {
        throw new ConflictError("User already exists");
    }   
    const newUser = await createUser(name, email, password);
    const token = signToken({ id: newUser._id }); 
   return {token, newUser}
}


export const loginUser = async (email, password) => {
    const user = await findUserByEmailAndPassword(email);
    if (!user) {
        throw new Error("invalid credentials");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error("invalid credentials");
    }
    const token = signToken({ id: user._id }); 
    return {token, user};
}   