import { Schema, model } from "mongoose";

const userSchema = new Schema({
   fullname: { 
      type: String,
      required: true
   },
   email: { 
      type: String, 
      required: true, 
      unique: true 
   },
   password: { 
      type: String, 
      required: true 
   },
   upiId: {
      type: Number,
      default: 0
   },
   secretPin: {
      type: Number,
      length: 6,
      unique: true 
   },
   balance: { 
      type: Number, 
      default: 0 
   },
   payables: {
      type: Number,
      default: 0
   },
   receivables: {
      type: Number,
      default: 0
   },
   isVerified: {
      type: Boolean,
      default: false
   }
},
{
   timestamps: true
});

const User = model('User', userSchema);
export default User;