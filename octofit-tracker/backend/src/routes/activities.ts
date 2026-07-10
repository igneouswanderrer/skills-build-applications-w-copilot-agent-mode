import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json({ message: 'Activities endpoint', activities });
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

export default router;
