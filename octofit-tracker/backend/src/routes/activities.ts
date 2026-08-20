import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'displayName username').sort({ date: -1 }));
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create activity', details: error });
  }
});

export default router;