import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
const app = express();

// Middlewares
app.use(express.json()); 
app.use(cookieParser());

app.use(cors({
   credentials: true,
   origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
   methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
   optionsSuccessStatus: 200,
}));

// Routes
import userRouter from  './routes/user.route.js';


// User Route
app.use('/api/v1/user', userRouter);


app.use(errorHandler);


export {app}