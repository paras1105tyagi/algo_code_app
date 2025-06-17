const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    main: {
        id: Number,
        name: String,
        difficulty: String,
        like_count: Number,
        dislike_count: Number,
        description_body: String,
        accept_count: Number,
        submission_count: Number,
        acceptance_rate_count: Number,
        discussion_count: Number,
        related_topics: Array,
        similar_questions: Array,
        solution_count: Number,
        code_default_language: String,
        code_body: Object,
    },
    editorial: {
        editorial_body: String,
    },
    test: Array,
    function_name: String,
    title: {
        type: String,
        unique: true,
        required: true
    }
});

// Create a compound index on main.id and title
problemSchema.index({ 'main.id': 1, title: 1 }, { unique: true });

const ProblemModel = mongoose.model("Problem", problemSchema);

module.exports = ProblemModel; 