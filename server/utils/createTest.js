const acorn = require("acorn");

let handleTestFunction = `
function handleTests(testCases, func) {
    let testCase;
    let problemInput;
    let expectedOut;
    let yourOut;
    let testCaseNumber;
    let status;
    let ERR;
    let date = new Date();
    let runtime;
    let t1;
    
    // Validate test cases
    if (!Array.isArray(testCases)) {
        throw new Error('Test cases must be an array');
    }

    if (testCases.length === 0) {
        throw new Error('No test cases provided');
    }

    for (let i = 0; i < testCases.length; i++) {
        let out;
        try {
            // Validate each test case
            if (!Array.isArray(testCases[i])) {
                throw new Error('Test case ' + i + ' must be an array');
            }

            if (testCases[i].length !== 3) {
                throw new Error('Test case ' + i + ' must have exactly 3 elements (array, target, expected_output)');
            }

            // For Two Sum problem, we expect:
            // testCases[i] = [array, target, expected_output]
            const nums = testCases[i][0];  // First element is the array
            const target = testCases[i][1];  // Second element is the target
            const exOutput = testCases[i][2];  // Third element is expected output
            
            t1 = performance.now();
            out = func(nums, target);  // Call function with array and target
            runtime = performance.now() - t1;

            if (!equality(out, exOutput)) {
                problemInput = JSON.stringify([nums, target]);
                testCase = testCases[i];
                expectedOut = JSON.stringify(exOutput);
                yourOut = JSON.stringify(out);
                testCaseNumber = i;
                status = "Wrong Answer";
                ERR = 'Wrong answer; Test Case Number: ' + i + 
                      '; Input: ' + JSON.stringify([nums, target]) + 
                      '; Expected Output: ' + JSON.stringify(exOutput) + 
                      '; Your Output: ' + JSON.stringify(out) + ';';
            }
        } catch (e) {
            ERR = e.toString();
            status = "Runtime Error";
            runtime = 0;
        }
    }

    if (ERR == undefined && testCase == undefined) status = "Accepted";
    return \`{ "status":"\${status}",\n"date":"\${date}",\n"runtime": \${runtime || 0},\n"error_message": "\${ERR || ''}",\n"test_case_number" :"\${testCaseNumber || 'undefined'}",\n"test_case":"\${testCase || 'undefined'}",\n"input": "\${problemInput || 'undefined'}",\n"expected_output":"\${expectedOut || 'undefined'}",\n"user_output":"\${yourOut || 'undefined'}"\n}\`;
}

function equality(item1, item2) {
    const isArrayItem1 = Array.isArray(item1);
    const isArrayItem2 = Array.isArray(item2);
    if (isArrayItem1 !== isArrayItem2) return false;
    if (isArrayItem1) {
        if (item1.length !== item2.length) return false;
        for (let i = 0; i < item1.length; i++) {
            const indexof = item2.indexOf(item1[i]);
            if (indexof === -1) return false;
            item2.splice(indexof, 1);
        }
        if (item2.length !== 0) return false;
        else return true;
    }
    return item1 === item2;
}`;

function writeTestFile(codeBody, testCases, functionName) {
    try {
        acorn.parse(codeBody, { ecmaVersion: 2022 });
    } catch (e) {
        console.log(e);
        return new Promise((resolve, reject) => {
            reject({
                stdout: {
                    status: "Runtime Error",
                    date: new Date(),
                    runtime: 0,
                    error_message: "Runtime Error",
                    test_case_number: undefined,
                    test_case: undefined,
                    expected_output: undefined,
                    user_output: undefined,
                },
                stdout_string: e,
                stderr: "",
                code_body: codeBody,
            });
        });
    }

    // Validate test cases before creating the test file
    if (!Array.isArray(testCases)) {
        return new Promise((resolve, reject) => {
            reject({
                stdout: {
                    status: "Runtime Error",
                    date: new Date(),
                    runtime: 0,
                    error_message: "Invalid test cases format: test cases must be an array",
                    test_case_number: undefined,
                    test_case: undefined,
                    expected_output: undefined,
                    user_output: undefined,
                },
                stdout_string: "Invalid test cases format",
                stderr: "",
                code_body: codeBody,
            });
        });
    }

    let data =
        "(function x() { try {" +
        codeBody +
        handleTestFunction +
        `try { return (handleTests(${JSON.stringify(
            testCases
        )}, ${functionName})); } catch (e) { return (\`{ "status":"Runtime Error",
        "date":"${new Date()}",
        "runtime": 0,
        "error_message": "\${e}",
        "test_case_number" :"undefined",
        "test_case":"undefined",
        "expected_output":"undefined",
        "user_output":"undefined"
        }\`); }} catch (e) { return (\`{ "status":"Runtime Error",
        "date":"${new Date()}",
        "runtime": 0,
        "error_message": "\${e}",
        "test_case_number" :"undefined",
        "test_case":"undefined",
        "expected_output":"undefined",
        "user_output":"undefined"
        }\`); }})()`;

    return new Promise((resolve, reject) => {
        try {
            const stdout = eval(data);
            console.log(stdout);
            resolve({
                stdout: JSON.parse(stdout),
                stdout_string: stdout,
                stderr: "",
                code_body: codeBody,
            });
        } catch (error) {
            return reject({
                stdout: {
                    status: "Runtime Error",
                    date: new Date(),
                    runtime: 0,
                    error_message: error.toString(),
                    test_case_number: undefined,
                    test_case: undefined,
                    expected_output: undefined,
                    user_output: undefined,
                },
                stdout_string: error.toString(),
                stderr: "",
                code_body: codeBody,
            });
        }
    });
}

module.exports = { writeTestFile }; 