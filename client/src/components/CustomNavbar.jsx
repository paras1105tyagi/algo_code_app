import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changeCase } from "../ts/utils/string";
import PropTypes from 'prop-types';

const CustomNavbar = ({ data }) => {
    const default_color_all = "#808080";
    const default_color_hover_all = "#fff";
    const default_bg_color_hover_all = "#333";
    const default_bg_color_all = "#000";
    const default_active_color_all = "#fff";
    const default_font_size_all = "14px";
    const default_transition_duration_all = "150ms";

    const [currentWidth, setCurrentWidth] = useState("");
    const [isInMenu, setIsInMenu] = useState(false);
    const [prevIsInMenu, setPrevIsInMenu] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const [activeItem, setActiveItem] = useState();

    const [activeItemWidth, setActiveItemWidth] = useState("");
    const [translateXActiveItem, setTranslateXActiveItem] = useState(0);

    const activeItemConst =
        data.default_active_item === "none"
            ? ""
            : data.default_active_item ||
              changeCase(data.items[0].text, "kebab");

    useEffect(() => {
        if (activeItemConst == undefined) return;
        const active = document.getElementById(activeItem || activeItemConst);
        const width = active?.clientWidth;
        setActiveItemWidth((width || 0) - 40 + "px");
        setTranslateXActiveItem(active?.offsetLeft || 0);
    }, []);

    const handleMenuItemsHover = (event) => {
        const targetWidth = event.currentTarget.offsetWidth;
        setCurrentWidth(targetWidth + "px");
        setTranslateX(event.currentTarget.offsetLeft);
        setPrevIsInMenu(isInMenu);
    };

    const handleActiveItem = (event) => {
        const target = event.currentTarget;
        setActiveItem(target.id);
        setActiveItemWidth(target.clientWidth - 40 + "px");
        setTranslateXActiveItem(target.offsetLeft);
    };

    return (
        <>
            <div
                onMouseOver={() => setIsInMenu(true)}
                onMouseOut={() => setIsInMenu(false)}
                style={{
                    backgroundColor: data.bg_color_all || default_bg_color_all,
                    color: data.color_all || default_color_all,
                    width: "fit-content",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    height: "50px",
                    fontSize: data.font_size_all || default_font_size_all,
                    alignItems: "center",
                    overflow: "hidden",
                    userSelect: "none",
                }}
            >
                <div
                    className={`h-[32px] absolute opacity-transition box-content rounded`}
                    id="hover-rect"
                    style={{
                        width: currentWidth,
                        transition: `transform ${
                            prevIsInMenu
                                ? data.transition_duration_all ||
                                  default_transition_duration_all
                                : "0ms"
                        }, width ${
                            prevIsInMenu
                                ? data.transition_duration_all ||
                                  default_transition_duration_all
                                : "0ms"
                        }, opacity ${
                            data.transition_duration_all ||
                            default_transition_duration_all
                        }`,
                        transform: `translateX(${translateX}px)`,
                        opacity: isInMenu ? 1 : 0,
                        backgroundColor:
                            data.bg_color_hover_all ||
                            default_bg_color_hover_all,
                    }}
                ></div>
                <div
                    id="active-underline"
                    className="absolute h-[2px] bottom-0"
                    style={{
                        width: activeItemWidth,
                        transition: `all ${
                            data.transition_duration_all ||
                            default_transition_duration_all
                        }`,
                        transform: `translateX(${translateXActiveItem + 20}px)`,
                        backgroundColor:
                            data.active_color_all || default_active_color_all,
                    }}
                ></div>
                {data.items.length !== 0 &&
                    data.items.map((elem) => (
                        <Link to={`${elem.link_path}`} key={elem.text}>
                            <div
                                id={changeCase(elem.text, "kebab")}
                                className={`hover-color ${
                                    (activeItem || activeItemConst) ===
                                    changeCase(elem.text, "kebab")
                                        ? "active-color"
                                        : ""
                                }`}
                                style={{
                                    position: "relative",
                                    zIndex: 40,
                                    paddingTop: "14px",
                                    paddingBottom: "14px",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    cursor: "pointer",
                                    transition: `all ${
                                        data.transition_duration_all ||
                                        default_transition_duration_all
                                    }`,
                                }}
                                onMouseOver={handleMenuItemsHover}
                                onClick={(event) => {
                                    handleActiveItem(event);
                                }}
                            >
                                {elem.text}
                            </div>
                        </Link>
                    ))}
                <style>
                    {`.hover-color:hover { color: ${
                        data.color_hover_all || default_color_hover_all
                    }}`}
                    {`.active-color{ color: ${
                        data.active_color_all || default_active_color_all
                    }}`}
                </style>
            </div>
        </>
    );
};

CustomNavbar.propTypes = {
    data: PropTypes.shape({
        bg_color_all: PropTypes.string,
        color_all: PropTypes.string,
        color_hover_all: PropTypes.string,
        bg_color_hover_all: PropTypes.string,
        active_color_all: PropTypes.string,
        font_size_all: PropTypes.string,
        transition_duration_all: PropTypes.string,
        default_active_item: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                link_path: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default CustomNavbar; 