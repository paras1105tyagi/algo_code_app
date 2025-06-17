import { useState } from "react";
import PropTypes from "prop-types";

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

    if (!input) return null;

    return (
        <div
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {status !== "Accepted" && (
                <pre className="bg-[#1a1a1a] text-yellow-100 font-mono text-[14px] p-4 pl-6 pr-12 rounded-md border border-yellow-600 relative whitespace-pre-wrap break-words">
                    <code>{input}</code>
                    {showCopyButton && (
                        <button
                            onClick={handleCopyClick}
                            className="absolute top-3 right-3 text-sm font-semibold px-3 py-1 rounded-md border border-yellow-400 bg-yellow-300 text-black hover:bg-yellow-400 transition-colors"
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
    status: PropTypes.string.isRequired,
};

export default CodeBlock;
