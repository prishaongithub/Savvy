import { Router } from "express";
import { authUser } from '../middlewares/auth.middleware.js';

const router = Router();

// routes

// Initiate transfer
router.post('/transfer', authUser, transferMoney );


export default router;