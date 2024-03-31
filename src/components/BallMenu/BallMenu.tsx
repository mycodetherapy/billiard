import React from "react";
import "./BallMenu.css";
import { IPosition } from "../Types/types";

interface IBallMenu {
  items: string[];
  action: (arg: string) => void;
  position: IPosition;
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
