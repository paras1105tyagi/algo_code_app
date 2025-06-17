const express = require("express");
const { writeTestFile } = require("../utils/createTest");
const ProblemModel = require("../models/problem");
const UserModel = require("../models/user");
const SubmissionModel = require("../models/submission");
const {
    sortByAcceptance,
    sortByDifficulty,
    sortByTitle,
} = require("../utils/utils");

const problem = express.Router();

problem.post("/all", async (req, res) => {
    const { id } = req.body;
    const search = req.query.search || "";
    const difficulty = req.query.difficulty || "";
    const acceptance = req.query.acceptance || "";
    const title = req.query.title || "";

    try {
        const allProblems = await ProblemModel.find(
            { "main.name": { $regex: search, $options: "i" } },
            "main.id main.name main.acceptance_rate_count main.difficulty main.like_count main.dislike_count"
        )
            .sort({ "main.id": 1 })
            .exec();

        const allProblemsSorted = sortByAcceptance(
            acceptance.toString(),
            sortByDifficulty(
                difficulty.toString(),
                sortByTitle(title.toString(), allProblems)
            )
        );

        const user = await UserModel.findById(id);
        const sOrA = {
            solved: user?.problems_solved,
            attempted: user?.problems_attempted,
        };

        let allProblemsArray = JSON.parse(
            JSON.stringify(allProblemsSorted)
        );

        if (sOrA.attempted) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.attempted.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "attempted";
                }
            }
        }
        if (sOrA.solved) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.solved.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "solved";
                }
            }
        }

        res.json(allProblemsArray);
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Internal Server Error" });
    }
});

problem.post("/submit/:name", async (req, res) => {
    const { name } = req.params;
    const { id, problem_name } = req.body;

    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        const user = await UserModel.findById(id);
        if (!user) {
            res.json([
                {
                    problem_name: problem_name,
                    status: "Runtime Error",
                    error: "user not found",
                    time: new Date(),
                    runtime: 0,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                    code_body: undefined,
                },
            ]);
            return;
        }

        if (problem) {
            // Ensure test cases are in the correct format
            const formattedTestCases = problem.test.map(testCase => {
                // Handle string format
                if (typeof testCase === 'string') {
                    try {
                        testCase = JSON.parse(testCase);
                    } catch (e) {
                        console.error('Failed to parse test case:', testCase);
                        return null;
                    }
                }

                // Handle object format with input/output
                if (testCase && typeof testCase === 'object') {
                    if ('input' in testCase && 'output' in testCase) {
                        // For Two Sum problem, input is [array, target]
                        const input = testCase.input;
                        const output = testCase.output;
                        return [input[0], input[1], output];
                    }
                }

                // Handle array format
                if (Array.isArray(testCase)) {
                    return testCase;
                }

                console.error('Invalid test case format:', testCase);
                return null;
            }).filter(testCase => testCase !== null);

            if (formattedTestCases.length === 0) {
                res.json([{
                    problem_name: problem_name,
                    status: "Runtime Error",
                    error: "No valid test cases found",
                    time: new Date(),
                    runtime: 0,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                    code_body: undefined,
                }]);
                return;
            }

            console.log('Formatted test cases:', formattedTestCases);
            writeTestFile(req.body.code, formattedTestCases, problem.function_name)
                .then(async (resolve) => {
                    if (resolve.stdout != undefined) {
                        console.log(resolve.stdout);
                        
                        // Create new submission
                        const submission = new SubmissionModel({
                            problem_name: problem_name,
                            status: resolve.stdout.status,
                            error: resolve.stdout.error_message,
                            time: resolve.stdout.date,
                            runtime: typeof resolve.stdout.runtime === 'string' ? 
                                parseFloat(resolve.stdout.runtime) || 0 : 
                                resolve.stdout.runtime || 0,
                            language: "JavaScript",
                            memory: Math.random() * 80,
                            code_body: resolve.code_body,
                            input: resolve.stdout.input,
                            expected_output: resolve.stdout.expected_output,
                            user_output: resolve.stdout.user_output,
                        });

                        // Save submission and get its ID
                        await submission.save();

                        // Add submission ID to user's submissions
                        if (!user.submissions) {
                            user.submissions = [];
                        }
                        user.submissions.unshift(submission._id);

                        // Update user's solved/attempted problems
                        if (submission.status === "Accepted") {
                            if (!user.problems_solved.includes(problem_name)) {
                                user.problems_solved.push(problem_name);
                                user.problems_solved_count += 1;
                            }
                        } else {
                            if (!user.problems_attempted.includes(problem_name)) {
                                user.problems_attempted.push(problem_name);
                            }
                        }

                        await user.save();

                        // Get all submissions for this problem
                        const subsByName = await SubmissionModel.find({
                            _id: { $in: user.submissions },
                            problem_name: problem_name
                        }).sort({ time: -1 });

                        res.json(subsByName);
                    }
                })
                .catch(async (e) => {
                    // Create error submission
                    const submission = new SubmissionModel({
                        problem_name: problem_name,
                        status: "Runtime Error",
                        error: e.toString(),
                        time: new Date(),
                        runtime: 0,
                        language: "JavaScript",
                        memory: Math.random() * 80,
                        code_body: undefined,
                    });

                    // Save submission and get its ID
                    await submission.save();

                    // Add submission ID to user's submissions
                    if (!user.submissions) {
                        user.submissions = [];
                    }
                    user.submissions.unshift(submission._id);

                    // Update attempted problems
                    if (!user.problems_attempted.includes(problem_name)) {
                        user.problems_attempted.push(problem_name);
                    }

                    await user.save();

                    // Get all submissions for this problem
                    const subsByName = await SubmissionModel.find({
                        _id: { $in: user.submissions },
                        problem_name: problem_name
                    }).sort({ time: -1 });

                    res.json(subsByName);
                });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

problem.post("/submissions/:name", async (req, res) => {
    const { name } = req.params;
    const { id } = req.body;
    try {
        const user = await UserModel.findById(id);
        if (!user || !user.submissions) {
            res.json([]);
            return;
        }

        const subsByName = await SubmissionModel.find({
            _id: { $in: user.submissions },
            problem_name: name
        }).sort({ time: -1 });

        res.json(subsByName);
    } catch (e) {
        console.log(e);
        res.json([]);
    }
});

problem.post("/:name", async (req, res) => {
    const { name } = req.params;
    const { id } = req.body;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });

        const user = await UserModel.findById(id);
        const problemJson = JSON.parse(JSON.stringify(problem));

        if (user?.problems_attempted.includes(name)) {
            problemJson.main.status = "attempted";
        }
        if (user?.problems_solved.includes(name)) {
            problemJson.main.status = "solved";
        }

        if (problemJson) {
            const response = problemJson;
            res.json(response);
        } else {
            res.json({ error: "problem not found" });
        }
    } catch (e) {
        console.log(e);
    }
});

problem.get("/:name/editorial", async (req, res) => {
    const name = req.params.name;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        if (problem) {
            const response = problem.editorial;
            res.json(response);
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = problem;