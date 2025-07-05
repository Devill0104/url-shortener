import wrapAsync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao } from "../dao/user.dao.js";
export const getAllUserUrls = wrapAsync( async (req, res)=>{
    console.log("kyuki middleware kam iya hoga")
    console.log("req.user", req.user)
    const {_id} = req.user
    console.log("id user ki ", _id)
    const urls = await getAllUserUrlsDao({user: _id})
    console.log("user ke urls controller me", urls)
    res.status(200).json({message: "success", urls})

})