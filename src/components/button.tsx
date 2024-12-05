'use client'

import React from 'react';
import './styles/button.scss';

interface ButtonProps {
    handleOnClick?: () => void;
    textColor?: string;
    iconColor?: string;
    backgroundColor?: string;
    text: string;
    borderColor?: string;
    logo?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ handleOnClick, textColor, iconColor, backgroundColor, borderColor, text, logo }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor || "white",
        color: textColor || "black",
        borderColor: `${borderColor || backgroundColor || textColor || "white"}`,
    };

    return (
        <button
            onClick={handleOnClick || (() => console.log("Button clicked"))}
            style={buttonStyle}
            className="btn"
        >
            {text || "Button Text Here"}
            {
                logo &&
                <span
                    className="btn-logo"
                    style={{ color: iconColor || "white" }}
                >
                    {logo}
                </span>
            }
        </button>
    );
}

export default Button;