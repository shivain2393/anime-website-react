import express from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { changeUserDetails, getUserDetails } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/getuserdetails", verifyJWT, verifyAdmin, getUserDetails)
router.post("/changeuserdetails", verifyJWT, verifyAdmin, changeUserDetails)

export default router;