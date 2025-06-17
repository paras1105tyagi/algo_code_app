import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ProblemNavbar = ({ data }) => {
    const [currentWidth, setCurrentWidth] = useState("");
    const [isInMenu, setIsInMenu] = useState(false);
    const [prevIsInMenu, setPrevIsInMenu] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const activeItem = data.nav_option_name;
    const active = document.getElementById(activeItem);
    const width = active?.clientWidth;
    const activeItemWidth = (width || 0) - 40 + "px";
    const translateXActiveItem = active?.offsetLeft || 0;

    const handleMenuItemsHover = (event) => {
        const targetWidth = event.currentTarget.offsetWidth;
        setCurrentWidth(targetWidth + "px");
        setTranslateX(event.currentTarget.offsetLeft);
        setPrevIsInMenu(isInMenu);
    };

    return (
        <div
            className="relative bg-black w-fit flex flex-row h-[50px] rounded-t-lg text-[14px] items-center text-[#808080] overflow-hidden select-none"
            onMouseOver={() => setIsInMenu(true)}
            onMouseOut={() => setIsInMenu(false)}
        >
            <div
                className="h-[32px] bg-borders absolute opacity-transition box-content rounded"
                id="hover-rect"
                style={{
                    width: currentWidth,
                    transition: `transform ${
                        prevIsInMenu ? "150ms" : "0ms"
                    }, width ${prevIsInMenu ? "150ms" : "0ms"}, opacity 150ms`,
                    transform: `translateX(${translateX}px)`,
                    opacity: isInMenu ? 1 : 0,
                }}
            ></div>
            <div
                id="active-underline"
                className="absolute h-[2px] bg-white bottom-0"
                style={{
                    width: activeItemWidth,
                    transition: `all 150ms`,
                    transform: `translateX(${translateXActiveItem + 20}px)`,
                }}
            ></div>
            <Link to={`/problem/${data.problem_name}`}>
                <div
                    id="description"
                    className={`ml-[9px] z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative ${
                        (activeItem || data.nav_option_name) === "description"
                            ? "text-white "
                            : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                >
                    Description
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/editorial`}>
                <div
                    id="editorial"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        (activeItem || data.nav_option_name) === "editorial"
                            ? "text-white "
                            : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                >
                    Editorial
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/solutions`}>
                <div
                    id="solutions"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        (activeItem || data.nav_option_name) === "solutions"
                            ? "text-white "
                            : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                >
                    Solutions
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/submissions`}>
                <div
                    id="submissions"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        (activeItem || data.nav_option_name) === "submissions"
                            ? "text-white "
                            : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                >
                    Submissions
                </div>
            </Link>
        </div>
    );
};

ProblemNavbar.propTypes = {
    data: PropTypes.shape({
        problem_name: PropTypes.string.isRequired,
        nav_option_name: PropTypes.string.isRequired
    }).isRequired
};

export default ProblemNavbar; 