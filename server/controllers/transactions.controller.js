import bcrypt from 'bcrypt';
import Transaction from '../models/transactions.model';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import ApiResponse from '../utils/ApiResponse';

const transferMoney = asyncHandler(async (req, res) => {

      const { receiverUpiId, amount, secretPin } = req.body;
      const sender = await User.findById(req.user._id);
      const receiver = await User.findOne({ upiId: receiverUpiId });

//       if (!receiver) {
//          return res.status(400).json({ msg: 'Receiver not found' });
//       }

      if (sender.balance < amount) {
         return res.status(400).json({ msg: 'Insufficient balance' });
      }

      const isPinCorrect = bcrypt.compare(secretPin, sender.secretPin);

      if (!isPinCorrect){
         
         const transaction = new Transaction({
            sender: sender._id,
            receiver: receiver._id,
            amount,
            status: 'failed',
         });

         await transaction.save();
         throw new ApiError(403, 'Incorrect UPI Pin');
      }

//       // In a real scenario, you'd initiate the UPI transaction here
//       // For this example, we'll just update balances directly

//       sender.balance -= amount;
//       receiver.balance += amount;

//       const transaction = new Transaction({
//          sender: sender._id,
//          receiver: receiver._id,
//          amount,
//          status: 'completed',
//       });

//       await sender.save();
//       await receiver.save();
//       await transaction.save();

      return res
      .status(402)
      .json(
         new ApiResponse(
            402,
            transaction,
            "Transaction Successful"
         )
      )

});

// Get user's transactions
const getTransactionHistory = asyncHandler(async (req, res) => {
      const transactions = await Transaction.find({
         $or: [{ sender: req.user.id }, { receiver: req.user.id }],
      }).sort({ timestamp: -1 });
      
      return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            transactions,
            "Transaction history fetched succesfully"
         )
      )
});

const addPayables = asyncHandler( async (req, res) => {
      const { amount } = req.body;

      if(!amount || amount===0) return;

      const user = await User.findOne({ upiId });

      user.payables += amount;
      await user.save();

      return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            {
               payables: user.payables
            },
            "Payables updated succesfully"
         )
      )
})

const addReceivables = asyncHandler( async (req, res) => {
      const { amount } = req.body;

      if(!amount || amount===0) return;

      const user = await User.findOne({ upiId });

      user.receivables += amount;
      await user.save();

      return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            {
               receivables: user.receivables
            },
            "Receivables updated succesfully"
         )
      )
})

export { transferMoney, getTransactionHistory, addPayables, addReceivables }