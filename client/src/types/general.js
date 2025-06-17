import PropTypes from 'prop-types';

export const ProblemDataPropTypes = PropTypes.shape({
    ...CodeDataPropTypes,
    ...DescriptionDataPropTypes
});

export const CodeDataPropTypes = PropTypes.shape({
    code_default_language: PropTypes.string.isRequired,
    code_body: PropTypes.objectOf(PropTypes.string).isRequired,
    testcases: PropTypes.arrayOf(TestCasePropTypes)
});

export const DescriptionDataPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['hard', 'medium', 'easy']).isRequired,
    like_count: PropTypes.number.isRequired,
    dislike_count: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['solved', 'none', 'attempted']),
    is_starred: PropTypes.bool,
    like_status: PropTypes.oneOf(['liked', 'disliked', 'none']),
    description_body: PropTypes.string.isRequired,
    accept_count: PropTypes.number.isRequired,
    submission_count: PropTypes.number.isRequired,
    acceptance_rate_count: PropTypes.number.isRequired,
    discussion_count: PropTypes.number.isRequired,
    related_topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    similar_questions: PropTypes.arrayOf(PropTypes.string).isRequired,
    solution_count: PropTypes.number.isRequired
});

export const EditorialDataPropTypes = PropTypes.shape({
    editorial_body: PropTypes.string.isRequired
});

export const JsonPropTypes = PropTypes.shape({
    main: ProblemDataPropTypes.isRequired,
    editorial: EditorialDataPropTypes.isRequired
});

export const TestCasePropTypes = PropTypes.shape({
    inputs: PropTypes.objectOf(PropTypes.string).isRequired,
    expected_output_name: PropTypes.string.isRequired,
    expected_output: PropTypes.string.isRequired
});

export const ProblemPageDataPropTypes = PropTypes.shape({
    activeNavOption: PropTypes.string
});

export const SidePanelDataPropTypes = PropTypes.shape({
    username: PropTypes.string.isRequired
});

export const UserPropTypes = PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    submissions: PropTypes.arrayOf(SubmissionPropTypes),
    problems_starred: PropTypes.arrayOf(PropTypes.string).isRequired,
    problems_solved: PropTypes.arrayOf(PropTypes.string).isRequired,
    problems_attempted: PropTypes.arrayOf(PropTypes.string).isRequired,
    problems_solved_count: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    solution_count: PropTypes.number.isRequired,
    reputation_count: PropTypes.number.isRequired
});

export const PublicUserPropTypes = PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    submissions: PropTypes.arrayOf(SubmissionPropTypes).isRequired,
    problems_starred: PropTypes.arrayOf(PropTypes.string).isRequired,
    problems_solved: PropTypes.arrayOf(PropTypes.string).isRequired,
    easy_problems_count: PropTypes.number.isRequired,
    medium_problems_count: PropTypes.number.isRequired,
    hard_problems_count: PropTypes.number.isRequired,
    problems_solved_easy: PropTypes.number.isRequired,
    problems_solved_medium: PropTypes.number.isRequired,
    problems_solved_hard: PropTypes.number.isRequired,
    problems_attempted: PropTypes.arrayOf(PropTypes.string).isRequired,
    problems_solved_count: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    solution_count: PropTypes.number.isRequired,
    reputation_count: PropTypes.number.isRequired
});

export const NavbarPropTypes = PropTypes.shape({
    items: PropTypes.arrayOf(NavbarItemPropTypes).isRequired,
    default_active_item: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['none'])]),
    width_all: PropTypes.string,
    color_all: PropTypes.string,
    color_hover_all: PropTypes.string,
    bg_color_hover_all: PropTypes.string,
    bg_color_all: PropTypes.string,
    active_color_all: PropTypes.string,
    onclick_function_all: PropTypes.func,
    transition_duration_all: PropTypes.string,
    font_size_all: PropTypes.string,
    options_all: PropTypes.any
});

export const NavbarItemPropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    link_path: PropTypes.string.isRequired,
    onclick_function: PropTypes.string,
    options: PropTypes.any
});

export const MainHeadingDataPropTypes = PropTypes.shape({
    items: PropTypes.arrayOf(MainHeadingItemsPropTypes),
    username: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.oneOf(['loggedin', 'not-loggedin', 'none'])
});

export const MainHeadingItemsPropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    link_path: PropTypes.string.isRequired
});

export const ProblemListDataPropTypes = PropTypes.shape({
    main: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        difficulty: PropTypes.oneOf(['hard', 'medium', 'easy']).isRequired,
        like_count: PropTypes.number.isRequired,
        dislike_count: PropTypes.number.isRequired,
        status: PropTypes.oneOf(['solved', 'none', 'attempted']).isRequired,
        is_starred: PropTypes.bool.isRequired,
        acceptance_rate_count: PropTypes.number.isRequired
    }).isRequired
});

export const StarDataPropTypes = PropTypes.shape({
    is_filled: PropTypes.bool.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
});

export const SubmissionsDataPropTypes = PropTypes.shape({
    submissions_list: PropTypes.arrayOf(SubmissionPropTypes).isRequired,
    is_submitted: PropTypes.bool.isRequired
});

export const SubmissionPropTypes = PropTypes.shape({
    problem_name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Accepted', 'Runtime Error', 'Wrong Answer', 'Time Limit Exceeded']).isRequired,
    error: PropTypes.string,
    runtime: PropTypes.number.isRequired,
    memory: PropTypes.number.isRequired,
    language: PropTypes.oneOf(['JavaScript']).isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    code_body: PropTypes.string.isRequired,
    input: PropTypes.string,
    expected_output: PropTypes.string,
    user_output: PropTypes.string
}); 