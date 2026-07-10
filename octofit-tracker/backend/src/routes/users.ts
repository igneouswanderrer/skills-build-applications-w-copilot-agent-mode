import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ message: 'Users endpoint', users });
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

export default router;
