import express from 'express';
import { verifyJWT } from "../utils/verifyJWT.js";
import { updateUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/updatedetails', verifyJWT, updateUserDetails);

export default router;