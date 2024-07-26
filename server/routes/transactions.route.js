import { Router } from "express";
import { authUser } from '../middlewares/auth.middleware.js';
import { addPayables, addReceivables, getTransactionHistory, transferMoney } from "../controllers/transactions.controller.js";

const router = Router();

// routes

// Initiate transfer
router.route('/transfer').post( authUser, transferMoney);
router.route('/history').get( authUser, getTransactionHistory);
router.route('/add-payables').post( authUser, addPayables);
router.route('/add-receivables').post( authUser, addReceivables);


export default router;