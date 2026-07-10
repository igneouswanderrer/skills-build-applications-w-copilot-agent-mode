import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json({ message: 'Teams endpoint', teams });
});

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

export default router;
