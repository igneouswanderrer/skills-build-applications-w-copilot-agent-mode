import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ message: 'Leaderboard endpoint', leaderboard });
});

router.post('/', async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json({ message: 'Leaderboard entry recorded', entry });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

export default router;
