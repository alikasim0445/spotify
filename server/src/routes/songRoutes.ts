import express from 'express';
import {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  getStats
} from '../controllers/songController.js';

const router = express.Router();

// Songs routes
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.post('/songs', createSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);

// Stats route
router.get('/stats', getStats);

export default router;