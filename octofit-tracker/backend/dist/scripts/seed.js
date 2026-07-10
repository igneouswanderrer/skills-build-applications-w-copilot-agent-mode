"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seeding the octofit_db database with test data');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const teams = await team_1.default.create([
            {
                name: 'Peak Performers',
                description: 'A team of high-intensity training enthusiasts.',
                memberCount: 3,
            },
            {
                name: 'Recovery Crew',
                description: 'Focused on balanced workouts and wellness.',
                memberCount: 2,
            },
        ]);
        const users = await user_1.default.create([
            {
                name: 'Ava Chen',
                email: 'ava.chen@example.com',
                role: 'member',
                joinDate: new Date('2026-03-15'),
                teamId: teams[0]._id,
            },
            {
                name: 'Marcus Hill',
                email: 'marcus.hill@example.com',
                role: 'coach',
                joinDate: new Date('2025-11-01'),
                teamId: teams[0]._id,
            },
            {
                name: 'Nina Patel',
                email: 'nina.patel@example.com',
                role: 'member',
                joinDate: new Date('2026-01-22'),
                teamId: teams[1]._id,
            },
            {
                name: 'Jamal Reyes',
                email: 'jamal.reyes@example.com',
                role: 'member',
                joinDate: new Date('2026-04-02'),
                teamId: teams[0]._id,
            },
            {
                name: 'Leah Brooks',
                email: 'leah.brooks@example.com',
                role: 'member',
                joinDate: new Date('2026-02-10'),
                teamId: teams[1]._id,
            },
        ]);
        const activities = await activity_1.default.create([
            {
                userId: users[0]._id,
                type: 'Running',
                durationMinutes: 42,
                caloriesBurned: 520,
                date: new Date('2026-07-08T07:30:00Z'),
            },
            {
                userId: users[2]._id,
                type: 'Yoga',
                durationMinutes: 60,
                caloriesBurned: 240,
                date: new Date('2026-07-09T09:00:00Z'),
            },
            {
                userId: users[3]._id,
                type: 'Cycling',
                durationMinutes: 55,
                caloriesBurned: 610,
                date: new Date('2026-07-07T17:00:00Z'),
            },
            {
                userId: users[1]._id,
                type: 'Strength Training',
                durationMinutes: 70,
                caloriesBurned: 720,
                date: new Date('2026-07-08T18:30:00Z'),
            },
        ]);
        const leaderboardEntries = await leaderboard_1.default.create([
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                score: 1240,
                rank: 1,
            },
            {
                userId: users[3]._id,
                teamId: teams[0]._id,
                score: 1120,
                rank: 2,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                score: 980,
                rank: 3,
            },
        ]);
        const workouts = await workout_1.default.create([
            {
                userId: users[0]._id,
                title: 'Morning Endurance Run',
                category: 'Cardio',
                durationMinutes: 45,
                difficulty: 'intermediate',
                scheduledFor: new Date('2026-07-12T06:30:00Z'),
            },
            {
                userId: users[2]._id,
                title: 'Core Stability Flow',
                category: 'Mobility',
                durationMinutes: 40,
                difficulty: 'beginner',
                scheduledFor: new Date('2026-07-13T08:00:00Z'),
            },
            {
                userId: users[3]._id,
                title: 'Power Lift Session',
                category: 'Strength',
                durationMinutes: 55,
                difficulty: 'advanced',
                scheduledFor: new Date('2026-07-12T17:00:00Z'),
            },
        ]);
        console.log('Created teams:', teams.length);
        console.log('Created users:', users.length);
        console.log('Created activities:', activities.length);
        console.log('Created leaderboard entries:', leaderboardEntries.length);
        console.log('Created workouts:', workouts.length);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
