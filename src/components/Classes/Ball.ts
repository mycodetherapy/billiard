class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number = 0;
  vy: number = 0;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    vx: number = 0,
    vy: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update(
    canvasWidth: number,
    canvasHeight: number,
    balls: Ball[],
    clickedBall: Ball | null
  ) {
    // Обновление координат шара и его столкновение с другими шарами и стенками
    this.x += this.vx;
    this.y += this.vy;

    const dampingFactor = 0.99; // Коэффициент затухания
    this.vx *= dampingFactor;
    this.vy *= dampingFactor;

    // Проверка границ поля по оси X
    if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
      this.vx *= -0.9; // Отражение от стенок
    }

    // Проверка границ поля по оси Y
    if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
      this.vy *= -0.9; // Отражение от стенок
    }

    // Если шар был активирован кликом или столкновением, обновляем его скорость
    if (this === clickedBall || clickedBall === null) {
      for (let i = 0; i < balls.length; i++) {
        const otherBall = balls[i];
        if (otherBall === this) continue; // Пропускаем текущий шар

        const dx = otherBall.x - this.x;
        const dy = otherBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Если шары столкнулись
        if (distance < this.radius + otherBall.radius) {
          const minDistance = this.radius + otherBall.radius;
          if (distance < minDistance) {
            const angle = Math.atan2(dy, dx);
            const targetX = this.x + Math.cos(angle) * minDistance;
            const targetY = this.y + Math.sin(angle) * minDistance;
            const ax = (targetX - otherBall.x) * 0.1;
            const ay = (targetY - otherBall.y) * 0.1;
            this.vx -= ax;
            this.vy -= ay;
            this.vx *= 0.9;
            this.vy *= 0.9;
          }
        }
      }
    }
  }

  changeColor(clickedBall: Ball | null, color: string) {
    if (this === clickedBall || clickedBall === null) {
      this.color = color;
    }
  }

  isClicked(mouseX: number, mouseY: number) {
    const distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance <= this.radius;
  }
}

export default Ball;
