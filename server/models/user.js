const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    problems_starred: [{ type: String }],
    problems_solved: [{ type: String }],
    problems_attempted: [{ type: String }],
    problems_solved_count: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    solution_count: { type: Number, default: 0 },
    reputation_count: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema); 