import User from "../models/user.model.js";
import shortUrl from '../models/shorturl.model.js'


export const findUserByEmail = async (email) => {
    return await User.findOne( {email} );
};  
export const findUserById = async (id) => {
    return await User.findById(id);
}
export const createUser = async (name, email, password ) => {   
    const newUser = new User({name,email,password})
    await newUser.save()
    return newUser;
}
export const findUserByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    return user
}
export const getAllUserUrlsDao = async (id) =>{
    console.log("dao wla fn")
    const data =  await shortUrl.find(id)
    console.log("dao me mila data", data)
    return data
}