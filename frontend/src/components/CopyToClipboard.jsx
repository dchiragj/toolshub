import React from "react";

const CopyToClipboard = ({ text, onCopy, children }) => {
    const handleClick = async () => {
        if (!text) return; // Don't copy if text is empty
        try {
            await navigator.clipboard.writeText(text);
            if (onCopy) onCopy();
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    // Clone the child element and attach onClick
    return React.cloneElement(children, {
        onClick: handleClick,
    });
}

export default CopyToClipboard;