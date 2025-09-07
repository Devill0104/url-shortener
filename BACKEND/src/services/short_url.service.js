import {generateNanoId} from '../utils/helper.js'
import shortUrlSchema from '../models/shorturl.model.js'
import { saveShortUrl } from '../dao/short_url.js';

// export const createShortUrlWithoutUser = async (url)=>{
//     console.log("reached short url service")
//     const shortUrl = generateNanoId(7);
//     if(!shortUrl) throw new Error("short url not generated");
//     const newUrl = await saveShortUrl(shortUrl, url)
//     console.log('✅ Saved new URL doc:', newUrl);
//     return shortUrl
// }

export const createShortUrlWithoutUser = async (url) => {
    console.log("🟡 [SERVICE] Starting createShortUrlWithoutUser...");
    console.log("🟡 [SERVICE] Input URL:", url);
    
    try {
        console.log("🟡 [SERVICE] Generating nano ID...");
        const shortUrl = generateNanoId(7);
        console.log("🟡 [SERVICE] Generated ID:", shortUrl);
        
        if (!shortUrl) {
            console.error("🔴 [SERVICE] Failed to generate short URL");
            throw new Error("short url not generated");
        }
        
        console.log("🟡 [SERVICE] Saving to database...");
        const newUrl = await saveShortUrl(shortUrl, url);
        console.log("🟡 [SERVICE] Saved URL document:", newUrl);
        
        console.log("🟡 [SERVICE] Returning short URL:", shortUrl);
        return shortUrl;
        
    } catch (error) {
        console.error("🔴 [SERVICE] Error in createShortUrlWithoutUser:", error);
        throw error;
    }
};
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