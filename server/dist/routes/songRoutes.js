import express from 'express';
import { getSongs, getSongById, createSong, updateSong, deleteSong, getStats } from '../controllers/songController.js';
const router = express.Router();
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.post('/songs', createSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);
router.get('/stats', getStats);
export default router;
//# sourceMappingURL=songRoutes.js.map