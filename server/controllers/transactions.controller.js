import asyncHandler from '../utils/asyncHandler';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const transferMoney = asyncHandler(async (req, res) => {
   try {
      const { receiverUpiId, amount } = req.body;
      const sender = await User.findById(req.user.id);
      const receiver = await User.findOne({ upiId: receiverUpiId });

      if (!receiver) {
         return res.status(400).json({ msg: 'Receiver not found' });
      }

      if (sender.balance < amount) {
         return res.status(400).json({ msg: 'Insufficient balance' });
      }

      // In a real scenario, you'd initiate the UPI transaction here
      // For this example, we'll just update balances directly

      sender.balance -= amount;
      receiver.balance += amount;

      const transaction = new Transaction({
         sender: sender._id,
         receiver: receiver._id,
         amount,
         status: 'completed',
      });

      await sender.save();
      await receiver.save();
      await transaction.save();

      res.json({ msg: 'Transfer successful', transaction });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// Get user's transactions
router.get('/history', auth, async (req, res) => {
   try {
      const transactions = await Transaction.find({
         $or: [{ sender: req.user.id }, { receiver: req.user.id }],
      }).sort({ timestamp: -1 });
      res.json(transactions);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});


export {}