import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }));
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create user', details: error });
  }
});

export default router;