import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://*.netlify.app'
    ],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', songRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Spotify Statistics API is running!' });
});
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
//# sourceMappingURL=server.js.map