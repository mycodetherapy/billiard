import React, { useRef, useEffect, useState } from "react";
import "./Billiards.css";
import Ball from "./Ball";
import { BallMenu } from "../BallMenu/BallMenu";

const Billiards: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballColors = ["black", "red", "white"];
  const initBalls = [
    new Ball(200, 500, 25, ballColors[0]),
    new Ball(225, 225, 25, ballColors[2]),
    new Ball(200, 269, 25, ballColors[2]),
    new Ball(175, 225, 25, ballColors[2]),
    new Ball(250, 181, 25, ballColors[2]),
    new Ball(200, 181, 25, ballColors[2]),
    new Ball(150, 181, 25, ballColors[2]),
  ];

  const [balls, setBalls] = useState<Ball[]>(initBalls);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      const render = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach((ball) => {
          ball.draw(context);
          ball.update(canvas.width, canvas.height, balls, selectedBall);
        });
        requestAnimationFrame(render);
      };
      render();
    }
  }, [balls]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball) => {
      if (ball.isClicked(mouseX, mouseY)) {
        const angle = Math.atan2(ball.y - mouseY, ball.x - mouseX);
        const speed = 5; // Начальная скорость
        // Изменение скорости шара в зависимости от положения мыши
        ball.vx = speed * Math.cos(angle);
        ball.vy = speed * Math.sin(angle);
        ball.update(canvas.width, canvas.height, balls, selectedBall);
      }
    });
  };

  const handleMouseClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEdit) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball) => {
      if (ball.isClicked(mouseX, mouseY)) {
        setShowMenu(!showMenu);
        setSelectedBall(ball);
        if (rect) {
          setMenuPosition({ x: rect.left + ball.x, y: rect.top + ball.y });
          //setMenuPosition({ x: rect.left + mouseX, y: rect.top + mouseY });
        }
      }
    });
    showMenu && setShowMenu(!showMenu);
  };

  const handleModeClick = () => setIsEdit(!isEdit);

  const changeColorBall = (color: string) => {
    selectedBall?.changeColor(selectedBall, color);
    setShowMenu(false);
  };

  return (
    <div className="billiards">
      <canvas
        ref={canvasRef}
        className="billiards-canvas"
        width={400}
        height={800}
        onClick={isEdit ? handleMouseClick : undefined}
        onMouseMove={!isEdit ? handleMouseMove : undefined}
      />
      {isEdit && showMenu && (
        <BallMenu
          items={ballColors}
          action={changeColorBall}
          position={{ posX: menuPosition.x, posY: menuPosition.y }}
        />
      )}
      <button className="ball__edit" onClick={handleModeClick}>
        {isEdit ? "Play" : "Edit mode"}
      </button>
    </div>
  );
};

export default Billiards;
