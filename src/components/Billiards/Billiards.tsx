import React, { useState } from "react";
import "./Billiards.css";
import { BallMenu } from "../BallMenu/BallMenu";
import { ActionButton } from "../Buttons/ActionButton";
import { ballColors } from "../Constants";
import { MyGlobalContext } from "../Contexts/UseGlobalContext";
import { PlayingField } from "../PlayingField/PlayingField";
import { IPosition } from "../Types/types";
import Ball from "../Classes/Ball";

const Billiards: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<IPosition>({
    posX: 0,
    posY: 0,
  });

  const handleModeClick = () => setIsEdit(!isEdit);

  const changeColorBall = (color: string) => {
    selectedBall?.changeColor(selectedBall, color);
    setShowMenu(false);
  };

  return (
    <MyGlobalContext.Provider
      value={{
        selectedBall,
        setSelectedBall,
        selectedPosition,
        setSelectedPosition,
        isEdit,
        setIsEdit,
        showMenu,
        setShowMenu,
      }}
    >
      <main className="billiards">
        <h1 className="head">Billiard</h1>
        <PlayingField />
        {isEdit && showMenu && (
          <BallMenu
            items={ballColors}
            action={changeColorBall}
            position={selectedPosition}
          />
        )}
        <ActionButton
          buttonText={isEdit ? "Play" : "Edit balloons"}
          action={handleModeClick}
        />
      </main>
    </MyGlobalContext.Provider>
  );
};

export default Billiards;
