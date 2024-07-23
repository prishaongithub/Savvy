import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
   sender: {
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
   },
   receiver: {
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
   },
   amount: {
      type: Number, 
      required: true 
   },
   status: {
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
   }
},
{
   timestamps: true
});

const Transaction = model('Transaction', transactionSchema);
export default Transaction;