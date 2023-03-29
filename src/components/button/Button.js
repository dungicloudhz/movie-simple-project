import React from "react";

const Button = ({
    onClick,
    className = "",
    full = false,
    type = "button",
    children,
    bgColor = "primary",
    ...props
}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${
                full ? "w-full" : ""
            } px-6 py-3 capitalize rounded-lg bg-primary ${bgClassName} ${className}`}
            disabled={props.disabled}
        >
            {children}
        </button>
    );
};

export default Button;
