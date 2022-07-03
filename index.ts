import mongoose from 'mongoose';
import 'dotenv/config';
import express from 'express';
import { json } from 'body-parser';
import { createAccount } from './routes/createAccount';
import { getAccount } from './routes/getAccount';
import { transferAmount } from './routes/transferMoney';
import { getTransactionHistory } from './routes/getTransactionHistory';
import { getBalance } from './routes/getBalance';
import { addDetails } from './routes/addDetails';
import { addCash } from './routes/addCash';


const app = express();
app.use(json({ limit: '10mb' }));
app.use(createAccount);
app.use(transferAmount);
app.use(getAccount);
app.use(getBalance);
app.use(getTransactionHistory);
app.use(addDetails);
app.use(addCash);
let message: string = 'Hello World';
console.log(message);


const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('Connected to MongoDb');
    } catch (err) {
      console.error(err);
    }
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}.`);
    });
  };
  
  start();
  