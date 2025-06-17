const UserModel = require("../models/user");

async function existsUsername(username) {
    const user = await UserModel.findOne({ username: username });
    return !(user == null);
}

async function existsEmail(email) {
    const user = await UserModel.findOne({ email: email });
    return !(user == null);
}

function sortByDifficulty(order, arr) {
    if (order === "") return arr;
    const difficultyRule = { easy: 1, medium: 2, hard: 3 };
    if (order === "asc") {
        return arr.sort(
            (a, b) =>
                difficultyRule[a.main.difficulty] -
                difficultyRule[b.main.difficulty]
        );
    } else {
        return arr.sort(
            (a, b) =>
                difficultyRule[b.main.difficulty] -
                difficultyRule[a.main.difficulty]
        );
    }
}

function sortByAcceptance(order, arr) {
    if (order === "") return arr;
    if (order === "asc") {
        return arr.sort(
            (a, b) =>
                b.main.acceptance_rate_count - a.main.acceptance_rate_count
        );
    } else {
        return arr.sort(
            (a, b) =>
                a.main.acceptance_rate_count - b.main.acceptance_rate_count
        );
    }
}

function sortByTitle(order, arr) {
    if (order === "") return arr;
    if (order === "asc") {
        return arr.sort((a, b) => a.main.id - b.main.id);
    } else {
        return arr.sort((a, b) => b.main.id - a.main.id);
    }
}

module.exports = {
    existsUsername,
    existsEmail,
    sortByDifficulty,
    sortByAcceptance,
    sortByTitle
}; 