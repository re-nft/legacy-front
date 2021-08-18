import React from "react";

type ButtonProps = {
  onClick: (e: unknown) => void;
  disabled?: boolean;
  description: string;
  datacy?: string;
};

export const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ disabled, onClick, description, datacy }, ref) => {
    return (
      <button
        //@ts-ignore
        ref={ref}
        className={`btn ${disabled ? "btn--disabled" : ""}`}
        disabled={disabled}
        onClick={onClick}
        data-cy={datacy}
        type="button"
      >
        <div>{description}</div>
      </button>
    );
  }
);
Button.displayName = "Button";
