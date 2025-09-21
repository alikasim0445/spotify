import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songRoutes';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Configure CORS to allow requests from Netlify frontend
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'https://*.netlify.app'   // Netlify deployments
  ],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', songRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Spotify Statistics API is running!' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app;