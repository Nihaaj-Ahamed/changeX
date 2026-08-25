import express from 'express';
import { shoutBeAdmin, shoutBeLoggedIn } from '../controllers/test.contoller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router=express.Router();
router.get("/should-be-logged-in",verifyToken,shoutBeLoggedIn);

router.get("/should-be-admin",shoutBeAdmin);


export default router;

