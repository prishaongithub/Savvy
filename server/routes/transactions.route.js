import { Router } from "express";
import { authUser } from '../middlewares/auth.middleware.js';
import { addPayables, addReceivables, getTransactionHistory, transferMoney } from "../controllers/transactions.controller.js";

const router = Router();

// routes

// Initiate transfer
router.post('/transfer', authUser, transferMoney);
router.post('/history', authUser, getTransactionHistory);
router.post('/add-payables', authUser, addPayables);
router.post('/add-receivables', authUser, addReceivables);


export default router;