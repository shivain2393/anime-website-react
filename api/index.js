import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js'
import animeRouter from './routes/anime.route.js'
import watchListRouter from './routes/watchlist.route.js'
import userRouter from './routes/user.route.js'


dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.log(error);
})


const app = express();

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/anime', animeRouter);
app.use('/api/watchlist', watchListRouter);
app.use('/api/user', userRouter);


app.use(errorMiddleware);

app.listen(process.env.PORT_NO, () => {
    console.log(`Server running on port ${process.env.PORT_NO}`)
})



