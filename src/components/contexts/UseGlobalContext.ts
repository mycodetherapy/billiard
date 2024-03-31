import { createContext, useContext } from "react";
import Ball from "../Classes/Ball";
import { IPosition } from "../Types/types";
export type GlobalContent = {
  selectedBall: Ball | null;
  selectedPosition: IPosition;
  isEdit: boolean;
  showMenu: boolean;
  setSelectedBall: (arg: Ball) => void;
  setSelectedPosition: (arg: IPosition) => void;
  setIsEdit: (arg: boolean) => void;
  setShowMenu: (arg: boolean) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  selectedBall: null,
  selectedPosition: {
    posX: 0,
    posY: 0,
  },
  isEdit: false,
  showMenu: false,
  setSelectedBall: () => {},
  setSelectedPosition: () => {},
  setIsEdit: () => {},
  setShowMenu: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
