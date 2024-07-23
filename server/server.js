import mongoose from 'mongoose'
import { app } from './app.js';
import config from './config.js';

const port  = config.port || 3000;

const connectDB = async () => {
   try {
      const db = await mongoose.connect(`${config.mongodb_uri}\fintechDB`);
      console.log("Connected to mongoDB successfully.");
   } catch (error) {
      throw new Error("Error while connecting to mongoDB : ", error);
   }
}

(async () => {
   try {
      await connectDB();
      app.listen(port, () => {
         console.log(`Server listening on port ${port}`);
      })
   } catch (error) {
      console.error(error);
   }
})();


app.get('/', (req, res) => {
   res.send("Hello world, I am a fintech geek");
})

