import express from "express";
import { addAnime, showAllAnimes } from "../controllers/anime.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();


router.post('/addanime', verifyJWT, verifyAdmin, addAnime);
router.get('/showallanimes', showAllAnimes)


export default router;