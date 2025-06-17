import { useState } from "react";
import PropTypes from 'prop-types';

function CodeBlock({ input, status }) {
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [copyText, setCopyText] = useState("Copy");

    function handleMouseEnter() {
        setShowCopyButton(true);
    }

    function handleMouseLeave() {
        setShowCopyButton(false);
    }

    function handleCopyClick() {
        if (!input) return;
        
        navigator.clipboard.writeText(input);
        setCopyText("Copied");

        setTimeout(() => {
            setCopyText("Copy");
        }, 2000);
    }

    if (!input) {
        return null;
    }

    return (
        <div 
            className="relative"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            {status !== "Accepted" && (
                <pre className="ml-[26px] submission-code-block relative">
                    <code>{input}</code>
                    {showCopyButton && (
                        <button 
                            onClick={handleCopyClick} 
                            className="text-[14px] text-text_2 border border-borders rounded absolute top-2 right-2 px-2 hover:text-white hover:border-text_2 code-font transition-colors"
                        >
                            {copyText}
                        </button>
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