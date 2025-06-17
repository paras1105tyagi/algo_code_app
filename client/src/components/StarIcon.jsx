import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ isStarred, onClick, data }) => {
    // Handle both prop structures
    const isFilled = data?.is_filled || isStarred;
    const width = data?.width || '14px';
    const height = data?.height || '14px';
    const handleClick = onClick || (() => {});

    return (
        <i 
            className={`bi bi-star${isFilled ? '-fill' : ''} text-[#808080] hover:text-yellow-400 cursor-pointer`}
            onClick={handleClick}
            style={{ width, height }}
        />
    );
};

StarIcon.propTypes = {
    isStarred: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.shape({
        is_filled: PropTypes.bool,
        width: PropTypes.string,
        height: PropTypes.string
    })
};

StarIcon.defaultProps = {
    isStarred: false,
    onClick: () => {},
    data: undefined
};

export default StarIcon; 