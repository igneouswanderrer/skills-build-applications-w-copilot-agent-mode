import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ message: 'Workouts endpoint', workouts });
});

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout saved', workout });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

export default router;
