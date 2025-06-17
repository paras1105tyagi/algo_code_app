const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    problem_name: { type: String, required: true },
    status: { type: String, required: true },
    error: { type: String },
    time: { type: Date, required: true },
    runtime: { type: Number, required: true },
    language: { type: String, required: true },
    memory: { type: Number, required: true },
    code_body: { type: String },
    input: { type: String },
    expected_output: { type: String },
    user_output: { type: String }
});

module.exports = mongoose.model('Submission', submissionSchema); 