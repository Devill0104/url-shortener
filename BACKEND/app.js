import express from 'express';
const app = express();
import dotenv from 'dotenv'
import connectDb from './src/config/mongo.config.js';
import { createShortUrlAuth, redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './errorHandler.js';
import auth_routes from './src/routes/auth.routes.js';
import { authMiddleware } from './src/middleware/auth.middleware.js';
import cors from 'cors'
import { attachUser } from './src//utils/attachUser.js ';
import user_routes from './src/routes/user.routes.js'
import cookieParser from 'cookie-parser';



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

dotenv.config('./.env')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(attachUser)

app.use("/api/auth", auth_routes);
app.use('/api/user', user_routes)
app.post('/api/create', authMiddleware, createShortUrlAuth)
app.get('/:id', redirectFromShortUrl)


app.get('/', (req, res) => {
    res.send("Welcome to URL Shortener API");
})


app.use(errorHandler);
app.listen(3000, ()=>{
    connectDb();
    console.log("app is listening")
})