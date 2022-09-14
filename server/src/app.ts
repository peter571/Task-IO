import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());

app.get('/', (req, res) => {
    res.send('Task manager API');
})

const CONNECTION_URL = `${process.env.MONGO_URL}`;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

