import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);

const allowedOrigins = [
  'http://localhost:5173', // Development
  'http://localhost:5174',
  'https://minisongs.netlify.app/' // Production - NO trailing slash!
];

// Configure CORS to allow requests from any origin (for testing)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', songRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Spotify Statistics API is running!' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify';

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