import { Router } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'displayName username'));
});

router.post('/', async (request, response) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create team', details: error });
  }
});

export default router;