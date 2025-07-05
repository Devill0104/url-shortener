import {generateNanoId} from '../utils/helper.js'
import shortUrlSchema from '../models/shorturl.model.js'
import { saveShortUrl } from '../dao/short_url.js';

export const createShortUrlWithoutUser = async (url)=>{
    console.log("reached short url service")
    const shortUrl = generateNanoId(7);
    if(!shortUrl) throw new Error("short url not generated");
    await saveShortUrl(shortUrl, url)
    return shortUrl
}


//creating short url when user is logged in
export const createShortUrlWithUser = async (url, userId, slug = null)=>{

    console.log("slug", slug  )
    const shortUrl = slug || generateNanoId(7);
    const exits = await shortUrlSchema.findOne({short_url: shortUrl});
    if(exits) 
        throw new Error("short url already exists");
    await saveShortUrl(shortUrl,  url,userId);
    return shortUrl
    
}