import express from "express"
import {createShortUrl, createShortUrlAuth} from "../controller/short_url.controller.js"

const router = express.Router()

router.post("/", createShortUrl)
router.post("/", createShortUrlAuth)

export default router;