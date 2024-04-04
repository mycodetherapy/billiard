import React, { useRef, useEffect, useState } from "react";
import "./PlayingField.css";
import Ball from "../Classes/Ball";
import { initBalls } from "../Constants";
import { useGlobalContext } from "../Contexts/UseGlobalContext";

export const PlayingField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    setSelectedBall,
    setSelectedPosition,
    isEdit,
    showMenu,
    setShowMenu,
  } = useGlobalContext();

  const [balls, setBalls] = useState<Ball[]>(initBalls);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      const render = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach((ball) => {
          ball.draw(context);
          ball.update(canvas.width, canvas.height, balls, ball);
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
        ball.update(canvas.width, canvas.height, balls, ball);
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
          setSelectedPosition({
            posX: rect.left + ball.x,
            posY: rect.top + ball.y,
          });
        }
      }
    });
    showMenu && setShowMenu(!showMenu);
  };

  return (
    <canvas
      ref={canvasRef}
      className="field"
      width={400}
      height={800}
      onClick={isEdit ? handleMouseClick : undefined}
      onMouseMove={!isEdit ? handleMouseMove : undefined}
    />
  );
};
