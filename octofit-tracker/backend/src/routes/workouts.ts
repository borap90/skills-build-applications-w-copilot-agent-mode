import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, name: 1 }));
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create workout', details: error });
  }
});

export default router;