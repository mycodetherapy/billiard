import React from "react";
import "./BallMenu.css";

interface IBallMenu {
  items: string[];
  action: (arg: string) => void;
  position: {
    posX: number;
    posY: number;
  };
}

export const BallMenu: React.FC<IBallMenu> = ({ items, action, position }) => {
  return (
    <ul
      className="menu"
      style={{
        left: position.posX,
        top: position.posY,
      }}
    >
      {items.map((item) => (
        <li className="menu__item" onClick={() => action(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};
