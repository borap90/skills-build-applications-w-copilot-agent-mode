import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data.
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex-morgan',
        email: 'alex.morgan@example.com',
        displayName: 'Alex Morgan',
        avatar: 'AM',
      },
      {
        username: 'jamie-lee',
        email: 'jamie.lee@example.com',
        displayName: 'Jamie Lee',
        avatar: 'JL',
      },
      {
        username: 'sam-rivera',
        email: 'sam.rivera@example.com',
        displayName: 'Sam Rivera',
        avatar: 'SR',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team focused on consistent outdoor miles.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Command',
        description: 'Strength and mobility enthusiasts.',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', duration: 35, calories: 420, date: new Date('2026-08-18') },
      { user: users[1]._id, type: 'Cycling', duration: 50, calories: 510, date: new Date('2026-08-17') },
      { user: users[2]._id, type: 'Strength', duration: 30, calories: 280, date: new Date('2026-08-16') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1840, rank: 1 },
      { user: users[1]._id, points: 1625, rank: 2 },
      { user: users[2]._id, points: 1410, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Steady State Run',
        description: 'A sustainable cardio session for building endurance.',
        difficulty: 'Beginner',
        duration: 30,
        target: 'Endurance',
      },
      {
        name: 'Full Body Circuit',
        description: 'A balanced circuit of strength and mobility movements.',
        difficulty: 'Intermediate',
        duration: 40,
        target: 'Strength',
      },
      {
        name: 'Power Intervals',
        description: 'Short, demanding intervals for experienced athletes.',
        difficulty: 'Advanced',
        duration: 25,
        target: 'Performance',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
