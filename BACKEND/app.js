import express from 'express';
const app = express();
import dotenv from 'dotenv'
import connectDb from './src/config/mongo.config.js';
import { createShortUrlAuth, redirectFromShortUrl , createShortUrl} from './src/controller/short_url.controller.js';
import { errorHandler } from './errorHandler.js';
import auth_routes from './src/routes/auth.routes.js';
import { authMiddleware } from './src/middleware/auth.middleware.js';
import cors from 'cors'
import { attachUser } from './src//utils/attachUser.js ';
import user_routes from './src/routes/user.routes.js'
import cookieParser from 'cookie-parser';



app.use(cors({
    origin: 'https://url-shortener-alpha-olive.vercel.app',
    credentials: true
}))

dotenv.config('./.env')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(attachUser)
;

app.use("/api/auth", auth_routes);

app.use('/api/user', user_routes)
//new code
app.get('/api/wakeup', (req, res) => {
  res.json({ status: 'ok', message: 'Server is awake!' });
})
//new code ends
app.post('/api/create', authMiddleware, createShortUrlAuth)
// app.post('/api/create',  createShortUrl)

app.get('/:id', redirectFromShortUrl)


app.get('/', (req, res) => {
    res.send("Welcome to URL Shortener API");
})


app.use(errorHandler);
const startServer = async () => {
  await connectDb(); // First connect DB

  const PORT = process.env.PORT || 3000; 
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
};

startServer(); 