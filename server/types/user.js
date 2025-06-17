const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    problems_starred: [{ type: String }],
    problems_solved: [{ type: String }],
    problems_attempted: [{ type: String }],
    problems_solved_count: { type: Number, required: true },
    rank: { type: Number, required: true },
    views: { type: Number, required: true },
    solution_count: { type: Number, required: true },
    reputation_count: { type: Number, required: true }
});

const publicUserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    problems_starred: [{ type: String }],
    problems_solved: [{ type: String }],
    easy_problems_count: { type: Number, required: true },
    medium_problems_count: { type: Number, required: true },
    hard_problems_count: { type: Number, required: true },
    problems_solved_easy: { type: Number, required: true },
    problems_solved_medium: { type: Number, required: true },
    problems_solved_hard: { type: Number, required: true },
    problems_attempted: [{ type: String }],
    problems_solved_count: { type: Number, required: true },
    rank: { type: Number, required: true },
    views: { type: Number, required: true },
    solution_count: { type: Number, required: true },
    reputation_count: { type: Number, required: true }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    PublicUser: mongoose.model('PublicUser', publicUserSchema)
}; 