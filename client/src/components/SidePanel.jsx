import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import ConfirmModal from "./ConfirmModal";
import { TOKEN_STORAGE_KEY, ID_STORAGE_KEY } from "../App";
import { deleteTokenAndId } from "../ts/utils/utils";

// Redesigned Side Panel Item
const SidePanelItem = ({ text, to, style }) => (
    <Link
        to={to}
        className="block w-[90%] mx-auto my-2 py-3 px-4 rounded-lg text-white hover:bg-white hover:text-black transition duration-200 bg-white/10 backdrop-blur"
        style={style}
    >
        {text}
    </Link>
);

SidePanelItem.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    style: PropTypes.object
};

// Redesigned Side Panel
const SidePanel = ({ displayFn, display, data }) => {
    const [logoutState, setLogoutState] = useState(false);
    const navigate = useNavigate();

    const onLogout = () => {
        deleteTokenAndId(TOKEN_STORAGE_KEY, ID_STORAGE_KEY);
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => displayFn(false)}
                className={`fixed top-0 left-0 w-screen h-screen z-40 transition-all duration-300 ${display ? "backdrop-blur-sm" : "hidden"}`}
            ></div>

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[320px] z-50 bg-gradient-to-b from-yellow-400 to-yellow-600 text-white shadow-lg transition-transform duration-300 transform ${
                    display ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-yellow-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white text-yellow-600 font-bold text-lg flex items-center justify-center">
                            {data.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-lg font-semibold">{data.username}</span>
                    </div>
                    <button
                        onClick={() => displayFn(false)}
                        className="text-white hover:text-black p-2 rounded-full hover:bg-white transition"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Navigation */}
                <div className="py-4">
                    <SidePanelItem text="Your Profile" to={`/accounts/${data.username}`} />
                    <SidePanelItem text="Problem List" to="/problemset" />
                    <SidePanelItem text="Settings" to="/settings" />
                </div>

                <hr className="border-yellow-200 w-[90%] mx-auto" />

                {/* Logout */}
                <div
                    onClick={() => setLogoutState(true)}
                    className="block w-[90%] mx-auto my-4 py-3 px-4 rounded-lg text-white hover:bg-red-600 bg-red-500 text-center font-medium cursor-pointer transition duration-200"
                >
                    Log Out
                </div>

                {/* Modal */}
                <ConfirmModal
                    display={logoutState}
                    displayFn={setLogoutState}
                    onOkFn={onLogout}
                    title="Log Out"
                    message={`Are you sure you want to log out of ${data.username}?`}
                />
            </div>
        </>
    );
};

SidePanel.propTypes = {
    display: PropTypes.bool.isRequired,
    displayFn: PropTypes.func.isRequired,
    data: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
};

export default SidePanel;
