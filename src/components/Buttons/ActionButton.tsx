import React from "react";
import "./ActionButton.css";

interface IActionButton {
  buttonText: string;
  action: () => void;
}

export const ActionButton: React.FC<IActionButton> = ({
  buttonText,
  action,
}) => {
  return (
    <button className="button" onClick={action}>
      {buttonText}
    </button>
  );
};
