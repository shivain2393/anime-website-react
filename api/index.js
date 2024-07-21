import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js'
import animeRouter from './routes/anime.route.js'
import watchListRouter from './routes/watchlist.route.js'
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js'
import path from 'path';


dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log('Connected to MongoDB')

})
.catch((error) => {
    console.log(error);
})

const __dirname = path.resolve();


const app = express();

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(cookieParser())

app.listen(process.env.PORT_NO, () => {
    console.log(`Server running on port ${process.env.PORT_NO}`)
})

app.use('/api/auth', authRouter);
app.use('/api/anime', animeRouter);
app.use('/api/watchlist', watchListRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.use(express.static(path.join(__dirname, 'client/dist/')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})


app.use(errorMiddleware);




