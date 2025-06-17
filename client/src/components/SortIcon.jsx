import React from "react";
import PropTypes from 'prop-types';

const SortIcon = ({ order }) => {
    return (
        <span className="inline-block w-fit h-fit relative -top-[3px]">
            {order === "" ? (
                <div className="flex flex-col h-fit ">
                    <i className="bi bi-caret-up-fill h-[8px]"></i>
                    <i className="bi bi-caret-down-fill h-[8px]"></i>
                </div>
            ) : order === "asc" ? (
                <div className="flex flex-col h-fit">
                    <i className="bi bi-caret-up-fill h-fit"></i>
                </div>
            ) : (
                <div className="flex flex-col h-fit relative top-[8px]">
                    <i className="bi bi-caret-down-fill h-fit"></i>
                </div>
            )}
        </span>
    );
};

SortIcon.propTypes = {
    order: PropTypes.oneOf(['', 'asc', 'desc']).isRequired
};

export default SortIcon; 