import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import userRoutes from './src/routes/user.js';
import taskRoutes from './src/routes/task.js';

dotenv.config();

const corsConfig = {
  credentials: true,
  origin: true,
};

const app = express();
app.use(compression());
app.use(express.json());
app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL)
  .then(() => app.listen(PORT, () => {
    console.log(`Trackminster server is running on port ${PORT}`);
  }))
  .catch((err) => console.log(err));