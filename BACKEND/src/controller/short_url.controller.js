import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/short_url.service.js";
import { getShortUrl } from "../dao/short_url.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


//wrapasync used so we dont need the try-catch anumore
export const createShortUrl = wrapAsync(async (req, res)=>{
    const {url} = req.body;
    const shortUrl= null ;
    console.log(req.user)
    if(req.user)
        shortUrl = await createShortUrlWithUser(url, req.user._id);
    else
        shortUrl = await createShortUrlWithoutUser(url);
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl})
    
})

export const createShortUrlAuth = wrapAsync(async (req, res)=>{
    const {url,slug} = req.body;
    let shortUrl = null ;
     console.log('✅ POST /api/create called', req.body, 'user:', req.user);
     if(req.user)
        shortUrl = await createShortUrlWithUser(url, req.user._id,slug);
    else
        shortUrl = await createShortUrlWithoutUser(url);
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl})
})


export const redirectFromShortUrl = wrapAsync(
    async (req,res)=>{
        const {id} = req.params;
        const url = await getShortUrl(id)
        console.log("urls is", url)
        url.clicks += 1;
        await url.save();
        res.redirect(url.full_url)
    }
)

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlService(url, customAlias);
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
}); 