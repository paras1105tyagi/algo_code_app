const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    inputs: { type: Map, of: String, required: true },
    expected_output_name: { type: String, required: true },
    expected_output: { type: String, required: true }
});

const codeDataSchema = new mongoose.Schema({
    code_default_language: { type: String, required: true },
    code_body: { type: Map, of: String, required: true },
    testcases: [testCaseSchema]
});

const descriptionDataSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    difficulty: { type: String, enum: ['hard', 'medium', 'easy'], required: true },
    like_count: { type: Number, required: true },
    dislike_count: { type: Number, required: true },
    status: { type: String, enum: ['solved', 'none', 'attempted'], required: true },
    is_starred: { type: Boolean, required: true },
    like_status: { type: String, enum: ['liked', 'disliked', 'none'], required: true },
    description_body: { type: String, required: true },
    accept_count: { type: Number, required: true },
    submission_count: { type: Number, required: true },
    acceptance_rate_count: { type: Number, required: true },
    discussion_count: { type: Number, required: true },
    related_topics: [{ type: String }],
    similar_questions: [{ type: String }],
    solution_count: { type: Number, required: true }
});

const editorialDataSchema = new mongoose.Schema({
    editorial_body: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
    main: {
        ...codeDataSchema.obj,
        ...descriptionDataSchema.obj
    },
    editorial: editorialDataSchema,
    test: [[mongoose.Schema.Types.Mixed]],
    function_name: { type: String, required: true }
});

const submissionSchema = new mongoose.Schema({
    problem_name: { type: String, required: true },
    status: {
        type: String,
        enum: ['Accepted', 'Runtime Error', 'Wrong Answer', 'Time Limit Exceeded'],
        required: true
    },
    error: String,
    runtime: { type: Number, required: true },
    memory: { type: Number, required: true },
    language: { type: String, enum: ['JavaScript'], required: true },
    time: { type: Date, required: true },
    code_body: String,
    input: String,
    expected_output: String,
    user_output: String
});

module.exports = {
    Problem: mongoose.model('Problem', problemSchema),
    Submission: mongoose.model('Submission', submissionSchema)
}; 