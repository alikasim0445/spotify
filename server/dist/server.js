import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
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
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
export default app;
