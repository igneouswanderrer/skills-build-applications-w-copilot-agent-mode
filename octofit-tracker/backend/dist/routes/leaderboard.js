"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await leaderboard_1.default.find().sort({ rank: 1 }).lean();
    res.json({ message: 'Leaderboard endpoint', leaderboard });
});
router.post('/', async (req, res) => {
    try {
        const entry = await leaderboard_1.default.create(req.body);
        res.status(201).json({ message: 'Leaderboard entry recorded', entry });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
});
exports.default = router;
