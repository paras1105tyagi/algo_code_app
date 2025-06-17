const ProblemModel = require('../models/problem');

const sampleProblems = [
    {
        main: {
            id: 1,
            name: "Two Sum",
            difficulty: "Easy",
            like_count: 0,
            dislike_count: 0,
            description_body: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
            accept_count: 0,
            submission_count: 0,
            acceptance_rate_count: 0,
            discussion_count: 0,
            related_topics: ["Array", "Hash Table"],
            similar_questions: [],
            solution_count: 0,
            code_default_language: "javascript",
            code_body: {
                javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
}`
            }
        },
        editorial: {
            editorial_body: `Solution Approach:
1. Use a hash map to store the numbers we've seen
2. For each number, check if its complement (target - current number) exists in the map
3. If it exists, return the indices
4. If not, add the current number and its index to the map

Time Complexity: O(n)
Space Complexity: O(n)`
        },
        test: [
            {
                input: [[2, 7, 11, 15], 9],
                output: [0, 1]
            },
            {
                input: [[3,2,4], 6],
                output: [1,2]
            },
            {
                input: [[3,3], 6],
                output: [0,1]
            }
        ],
        function_name: "twoSum",
        title: "two-sum"
    },
    {
        main: {
            id: 2,
            name: "Valid Parentheses",
            difficulty: "Easy",
            like_count: 0,
            dislike_count: 0,
            description_body: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`,
            accept_count: 0,
            submission_count: 0,
            acceptance_rate_count: 0,
            discussion_count: 0,
            related_topics: ["String", "Stack"],
            similar_questions: [],
            solution_count: 0,
            code_default_language: "javascript",
            code_body: {
                javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
}`
            }
        },
        editorial: {
            editorial_body: `Solution Approach:
1. Use a stack to keep track of opening brackets
2. For each closing bracket, check if it matches the last opening bracket
3. If stack is empty at the end, string is valid

Time Complexity: O(n)
Space Complexity: O(n)`
        },
        test: [
            {
                input: ["()"],
                output: true
            },
            {
                input: ["()[]{}"],
                output: true
            },
            {
                input: ["(]"],
                output: false
            }
        ],
        function_name: "isValid",
        title: "valid-parentheses"
    },
    {
        main: {
            id: 3,
            name: "Reverse Linked List",
            difficulty: "Easy",
            like_count: 0,
            dislike_count: 0,
            description_body: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []`,
            accept_count: 0,
            submission_count: 0,
            acceptance_rate_count: 0,
            discussion_count: 0,
            related_topics: ["Linked List", "Recursion"],
            similar_questions: [],
            solution_count: 0,
            code_default_language: "javascript",
            code_body: {
                javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    // Write your code here
}`
            }
        },
        editorial: {
            editorial_body: `Solution Approach:
1. Use three pointers: prev, current, and next
2. Iterate through the list, reversing the links
3. Return the new head (prev)

Time Complexity: O(n)
Space Complexity: O(1)`
        },
        test: [
            {
                input: [[1,2,3,4,5]],
                output: [5,4,3,2,1]
            },
            {
                input: [[1,2]],
                output: [2,1]
            },
            {
                input: [[]],
                output: []
            }
        ],
        function_name: "reverseList",
        title: "reverse-linked-list"
    }
];

const seedProblems = async () => {
    try {
        // Clear existing problems
        await ProblemModel.deleteMany({});
        
        // Insert new problems
        await ProblemModel.insertMany(sampleProblems);
        
        console.log('Problems seeded successfully!');
    } catch (error) {
        console.error('Error seeding problems:', error);
    }
};

module.exports = seedProblems; 