import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { kebabToSpacedPascal } from "../ts/utils/string";
import Loading from "./Loading";
import SortIcon from "./SortIcon";
import StarIcon from "./StarIcon";
import Tooltip from "./Tooltip";

const ProblemList = ({ data, searchFn, searchQuery }) => {
    const [refReset, setRefReset] = useState(0);
    const statusRef = useRef(null);
    const titleRef = useRef(null);
    const acceptanceRef = useRef(null);
    const difficultyRef = useRef(null);
    const likesRef = useRef(null);
    const dislikesRef = useRef(null);
    const starRef = useRef(null);

    const [SortOptions, setSortOptions] = useState({
        acceptance_rate_count: "",
        difficulty: "",
        title: "",
    });

    const [isSortLoading, setIsSortLoading] = useState(false);

    const statusWidth = starRef.current?.clientWidth;
    const acceptanceWidth = acceptanceRef.current?.clientWidth;
    const difficultyWidth = difficultyRef.current?.clientWidth;
    const likesWidth = likesRef.current?.clientWidth;
    const dislikesWidth = dislikesRef.current?.clientWidth;
    const starWidth = starRef.current?.clientWidth;

    const difficultyOnClick = async () => {
        setIsSortLoading(true);
        const { difficulty } = SortOptions;
        const newOptions = {
            difficulty:
                difficulty === "" ? "asc" : difficulty === "asc" ? "desc" : "",
            title: SortOptions.title,
            acceptance_rate_count: SortOptions.acceptance_rate_count,
        };
        setSortOptions(newOptions);
        await searchFn(searchQuery, newOptions);
        setIsSortLoading(false);
    };

    const acceptanceOnClick = async () => {
        setIsSortLoading(true);
        const { acceptance_rate_count } = SortOptions;
        const newOptions = {
            acceptance_rate_count:
                acceptance_rate_count === ""
                    ? "asc"
                    : acceptance_rate_count === "asc"
                    ? "desc"
                    : "",
            title: SortOptions.title,
            difficulty: SortOptions.difficulty,
        };
        setSortOptions(newOptions);
        await searchFn(searchQuery, newOptions);
        setIsSortLoading(false);
    };

    const titleOnClick = async () => {
        setIsSortLoading(true);
        const { title } = SortOptions;
        const newOptions = {
            title: title === "" ? "asc" : title === "asc" ? "desc" : "",
            acceptance_rate_count: SortOptions.acceptance_rate_count,
            difficulty: SortOptions.difficulty,
        };
        setSortOptions(newOptions);
        await searchFn(searchQuery, newOptions);
        setIsSortLoading(false);
    };

    useEffect(() => {
        setRefReset(1);
    }, []);

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row w-full text-[14px] h-[40px] items-center text-[#808080] border-b border-borders select-none">
                    <div
                        id="status-label"
                        className="h-fit w-fit px-[20px] ml-[10px]"
                        ref={statusRef}
                    >
                        Status
                    </div>
                    <div
                        id="title-label"
                        className="h-fit flex-grow px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={titleRef}
                        style={{
                            color:
                                SortOptions.title === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.title === "desc"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => titleOnClick()}
                    >
                        Title
                        <SortIcon order={SortOptions.title} />
                    </div>
                    <div
                        id="accaptance-label"
                        className="h-fit w-fit px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={acceptanceRef}
                        style={{
                            color:
                                SortOptions.acceptance_rate_count === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.acceptance_rate_count === "desc"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => acceptanceOnClick()}
                    >
                        Acceptance
                        <SortIcon order={SortOptions.acceptance_rate_count} />
                    </div>
                    <div
                        id="difficulty-label"
                        className="h-fit w-fit px-[20px] hover:cursor-pointer hover:text-white transition"
                        ref={difficultyRef}
                        style={{
                            color:
                                SortOptions.difficulty === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.difficulty === "desc"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => difficultyOnClick()}
                    >
                        Difficulty
                        <SortIcon order={SortOptions.difficulty} />
                    </div>
                    <div
                        id="likes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={likesRef}
                    >
                        Likes
                    </div>
                    <div
                        id="dislikes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={dislikesRef}
                    >
                        Dislikes
                    </div>
                    <div
                        id="star-label"
                        className="h-fit w-fit px-[20px]"
                        ref={starRef}
                    >
                        Star
                    </div>
                </div>
                {data != undefined &&
                data.length !== 0 &&
                statusRef.current != null ? (
                    <>
                        {isSortLoading ? (
                            <div className="sort-loading-backdrop w-[calc(100%-18px)] h-[calc(100%-126px)] z-[180] absolute top-[100px] ">
                                <div className="relative w-full h-full">
                                    <div className="absolute top-1/2 left-1/2">
                                        <Loading color="white" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {data.map(({ main }) => (
                            <div
                                key={main.id}
                                className={`h-[40px] w-full text-[14px] hover:text-black duration-150 ${
                                    main.difficulty === "easy"
                                        ? "hover-easy-bg-color"
                                        : main.difficulty === "medium"
                                        ? "hover-medium-bg-color"
                                        : "hover-hard-bg-color"
                                } `}
                            >
                                <Link
                                    to={`/problem/${main.name}`}
                                    className="w-full h-[40px] flex flex-row whitespace-nowrap "
                                >
                                    <div
                                        style={{
                                            width: statusWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        <div
                                            className={`ml-[20px] relative`}
                                            style={{
                                                color:
                                                    main.status === "solved"
                                                        ? "#22c55e"
                                                        : main.status === "none"
                                                        ? "#808080"
                                                        : "#f97316",
                                            }}
                                        >
                                            {main.status === "solved" ? (
                                                <i
                                                    className="bi bi-check-circle status-color"
                                                ></i>
                                            ) : main.status === "attempted" ? (
                                                <Tooltip
                                                    text="Attempted"
                                                    style={{
                                                        height: "28px",
                                                        lineHeight: "12px",
                                                        fontSize: "14px",
                                                        marginTop: "6px",
                                                        marginLeft: "-20px",
                                                        color: "white",
                                                        backgroundColor:
                                                            "black",
                                                        zIndex: "140",
                                                        padding: "8px 12px",
                                                        borderRadius: "4px",
                                                        border: "1px solid var(--borders-color)",
                                                    }}
                                                >
                                                    <i
                                                        className="bi bi-x-circle status-color"
                                                    ></i>
                                                </Tooltip>
                                            ) : (
                                                <div className="border rounded-[99px] border-[#808080] w-[14px] h-[14px] mt-[13px] status-color"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="flex-grow "
                                        style={{
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[40px]">
                                            {main.id +
                                                ". " +
                                                kebabToSpacedPascal(main.name)}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: acceptanceWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.acceptance_rate_count}
                                            {"%"}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: difficultyWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div
                                            className={`ml-[20px] difficulty-text duration-150 ${
                                                main.difficulty === "easy"
                                                    ? "text-green-500"
                                                    : main.difficulty ===
                                                      "medium"
                                                    ? "text-orange-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {kebabToSpacedPascal(
                                                main.difficulty
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: likesWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.like_count}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: dislikesWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.dislike_count}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: starWidth,
                                        }}
                                        className="h-full flex items-center px-[20px]"
                                    >
                                        <StarIcon isStarred={false} onClick={() => {}} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>
                ) : data != undefined && data.length === 0 ? (
                    <div className="text-[14px] ml-[30px] text-red-600 h-[40px] leading-[40px]">
                        Problem not found
                    </div>
                ) : (
                    <Loading For="pList" />
                )}
            </div>
        </div>
    );
};

ProblemList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            main: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                status: PropTypes.oneOf(['solved', 'attempted', 'none']).isRequired,
                difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
                acceptance_rate_count: PropTypes.number.isRequired,
                like_count: PropTypes.number.isRequired,
                dislike_count: PropTypes.number.isRequired,
                is_starred: PropTypes.bool.isRequired
            }).isRequired
        })
    ).isRequired,
    searchFn: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired
};

export default ProblemList; 