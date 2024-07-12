import express from 'express';
import { verifyJWT } from '../utils/verifyJWT.js';
import { addToWatchList, removeFromWatchList } from '../controllers/watchlist.controller.js';


const router = express.Router();

router.post('/addtowatchlist', verifyJWT, addToWatchList);
router.post('/removefromwatchlist', verifyJWT, removeFromWatchList)


export default router;