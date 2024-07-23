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
   username: { 
      type: String, 
      required: true, 
      unique: true 
   },
   password: { 
      type: String, 
      required: true 
   },
   upiId: { 
      type: String, 
      unique: true 
   },
   balance: { 
      type: Number, 
      default: 0 
   },
},
{
   timestamps: true
});

const User = model('User', userSchema);
export default User;