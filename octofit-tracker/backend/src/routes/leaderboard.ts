import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'displayName username').sort({ rank: 1 }));
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await Leaderboard.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create leaderboard entry', details: error });
  }
});

export default router;