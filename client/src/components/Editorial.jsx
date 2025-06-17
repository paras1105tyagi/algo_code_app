import React from 'react';
import PropTypes from 'prop-types';
import { convertMarkdownToHtml } from "../ts/utils/utils";

const Editorial = ({ data }) => {
    if (!data) {
        return (
            <div className="text-[14px] text-text_2 mx-auto text-center mt-[50px]">
                No editorial available
            </div>
        );
    }

    return (
        <div className="mt-[36px] ml-[26px] text-[14px]">
            <div
                className="editorial-body"
                dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(data)
                }}
            />
        </div>
    );
};

Editorial.propTypes = {
    data: PropTypes.string.isRequired
};

export default Editorial; 