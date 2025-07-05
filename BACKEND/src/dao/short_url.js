import { ConflictError } from '../../errorHandler.js'
import shortUrlSchema from '../models/shorturl.model.js'


export const  saveShortUrl = async (shortUrl, longUrl, userId)=>{
    try{
        const newUrl = new shortUrlSchema({
            full_url: longUrl,
            short_url: shortUrl
        })
    
        if(userId) {
            newUrl.user = userId
        }
        console.log("shorturl in dao", shortUrl)
        console.log("logn Url in dao", longUrl)
        console.log("newUrl in dao", newUrl)
        await newUrl.save()
        console.log("newUrl saved")
        return newUrl
    } catch(err) {
        if(err.code == 11000) {
            throw new ConflictError("short url already exists")
        }
        throw new Error(err)
    }
    
}
export const getShortUrl = async (shortUrl)=>{
    return await shortUrlSchema.findOne({short_url: shortUrl})
}

export const getCustomShortUrl = async (slug)=>{
    return await shortUrlSchema.findOne({short_url: slug})
}