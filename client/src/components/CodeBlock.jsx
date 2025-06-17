import { useState } from "react";
import PropTypes from 'prop-types';

function CodeBlock({ input, status }) {
    const [showCopyButton, setShowCopyButton] = useState(false);

    function handleMouseEnter() {
        setShowCopyButton(true);
    }

    function handleMouseLeave() {
        setShowCopyButton(false);
    }

    function handleCopyClick(event) {
        navigator.clipboard.writeText(input);

        const button = event.currentTarget;
        button.innerHTML = "Copied";

        setTimeout(() => {
            button.innerHTML = "Copy";
        }, 2000);
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {status !== "Accepted" && (
                <pre className="ml-[26px] submission-code-block relative">
                    <code>{input}</code>
                    {showCopyButton && (
                        <button onClick={handleCopyClick} className="text-[14px] text-text_2 border border-borders rounded absolute top-2 right-2 px-2 hover:text-white hover:border-text_2 code-font">Copy</button>
                    )}
                </pre>
            )}
        </div>
    );
}

CodeBlock.propTypes = {
    input: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default CodeBlock; 