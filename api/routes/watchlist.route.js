import express from 'express';
import { verifyJWT } from '../utils/verifyJWT.js';
import { getWatchList, addToWatchList, removeFromWatchList } from '../controllers/watchlist.controller.js';


const router = express.Router();

router.get('/getwatchlist', verifyJWT,  getWatchList);
router.post('/addtowatchlist', verifyJWT, addToWatchList);
router.post('/removefromwatchlist', verifyJWT, removeFromWatchList)


export default router;