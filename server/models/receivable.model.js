import { model, Schema } from "mongoose";

const receivablesSchema = new Schema({
   from: {
      type: Schema.Types.ObjectId,
      required: true
   },
   by: {
      type: Schema.Types.ObjectId,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   occasion: {
      type: String,
      required: true
   }
})

const Receivables = model('Receivables', receivablesSchema);
export default Receivables;