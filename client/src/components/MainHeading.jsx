import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import SidePanel from "./SidePanel";
import Notification from "./Notification";

const MainHeading = ({ data }) => {
    const [sidePanelState, setSidePanelState] = useState(false);
    const [notifDisplayState, setNotifDisplayState] = useState(false);

    return (
        <>
            <div className="fixed w-full h-[60px] bg-gradient-to-r from-yellow-400 to-yellow-500 border-b border-yellow-600 flex items-center justify-between px-6 z-[100]">
                {/* Logo */}
                <Link to="/" className="text-[24px] font-bold italic select-none">
                    <span className="text-white">Algo</span>
                    <span className="text-black">_Code</span>
                </Link>

                {/* Navigation Items */}
                <div className="hidden md:flex space-x-6">
                    {data?.items?.map((elem) => (
                        <Link
                            key={elem.text}
                            to={elem.link_path}
                            className="text-black font-medium hover:text-white transition"
                        >
                            {elem.text}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    {/* Mobile menu icon */}
                    <div className="md:hidden">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-300 text-black cursor-pointer border border-yellow-600">
                            <i className="bi bi-list"></i>
                        </div>
                    </div>

                    {/* Notification */}
                    {(data?.status === "loggedin" || data?.status === undefined) && (
                        <div className="relative">
                            <Notification
                                display={notifDisplayState}
                                displayFn={setNotifDisplayState}
                            />
                        </div>
                    )}

                    {/* Profile Picture or Auth Buttons */}
                    {data?.status === "loggedin" || data?.status === undefined ? (
                        <>
                            <div
                                className="w-8 h-8 rounded-full border border-yellow-600 cursor-pointer flex items-center justify-center bg-white"
                                onClick={() => setSidePanelState(!sidePanelState)}
                            >
                                <Tooltip text={data?.username || ""}>
                                    <div className="w-full h-full rounded-full bg-yellow-100"></div>
                                </Tooltip>
                            </div>
                            <SidePanel
                                displayFn={setSidePanelState}
                                display={sidePanelState}
                                data={{ username: data?.username || "" }}
                            />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-yellow-700 font-bold px-4 py-1.5 rounded border border-yellow-600 hover:bg-yellow-300"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-black text-white font-bold px-4 py-1.5 rounded border border-black hover:bg-yellow-800"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[60px]"></div>
        </>
    );
};

MainHeading.propTypes = {
    data: PropTypes.shape({
        status: PropTypes.oneOf(["loggedin", "not-loggedin"]),
        username: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                link_path: PropTypes.string.isRequired,
            })
        ),
    }),
};

export default MainHeading;
