'use client'

import React from 'react';
import './index.scss';

interface ButtonProps {
    handleOnClick?: () => void;
    color?: string;
    backgroundColor?: string;
    text: string;
    borderColor?: string;
}

const Button: React.FC<ButtonProps> = ({ handleOnClick, color, backgroundColor, borderColor, text }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor || "white",
        color: color || "black",
        borderColor: `${borderColor || backgroundColor || color || "white"}`,
    };

    return (
        <button
            onClick={handleOnClick || (() => console.log("Button clicked"))}
            style={buttonStyle}
            className="btn"
        >
            {text || "Button Text Here"}
        </button>
    );
}

export default Button;
