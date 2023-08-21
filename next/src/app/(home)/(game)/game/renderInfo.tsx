import { MapType } from '@/components/(home)/(game)/game/typeSelection';
import Ball from './classes/ball';
import { PlayerSide } from './classes/bar';
import { GameMap } from './classes/gameMap';
import GamePlayer from './classes/gamePlayer';

export default class RenderInfo {
  public gamePlayers: { [socketId: string]: GamePlayer } = {};
  public ball: Ball = new Ball();
  public gameMap: GameMap = new GameMap();

  animate(ctx: CanvasRenderingContext2D) {
    const BLACK = 'rgb(32, 32, 32)';
    const animateCallback: FrameRequestCallback = () => {
      //배경
      ctx.fillStyle = BLACK;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (this.gameMap.type === MapType.Crazy) {
        ctx.fillStyle = this.ball.color;
        for (let y = 0; y < ctx.canvas.height; y += this.ball.radius * 2) {
          for (let x = 0; x < ctx.canvas.width; x += this.ball.radius * 2) {
            ctx.beginPath();
            ctx.arc(x, y, this.ball.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      //금
      ctx.fillStyle = this.ball.color;
      ctx.fillRect(
        ctx.canvas.width / 2 - ctx.canvas.width / 128 / 2,
        0,
        ctx.canvas.width / 128,
        ctx.canvas.height,
      );

      //ball
      ctx.beginPath();
      ctx.fillStyle = this.ball.color;
      ctx.arc(
        this.ball.position.x,
        this.ball.position.y,
        this.ball.radius,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      //플레이어
      for (const id in this.gamePlayers) {
        ctx.fillStyle = this.gamePlayers[id].bar.color;
        ctx.fillRect(
          this.gamePlayers[id].bar.position.x,
          this.gamePlayers[id].bar.position.y,
          this.gamePlayers[id].bar.width,
          this.gamePlayers[id].bar.length,
        );

        //플레이어의 스코어
        ctx.beginPath();

        // 검정색 배경 사각형 그리기
        const text = `${this.gamePlayers[id].nickName}: ${this.gamePlayers[id].score}`;
        const textWidth = ctx.measureText(text).width;
        const textHeight = 50;
        const padding = 5; // 검정색 배경과 텍스트 사이의 여백
        const cell = 10; //윗변과의 거리
        const xPosition =
          this.gamePlayers[id].side === PlayerSide.LEFT
            ? ctx.canvas.width * (1 / 4)
            : ctx.canvas.width * (3 / 4);

        ctx.fillStyle = BLACK;
        ctx.fillRect(
          xPosition - textWidth / 2 - padding,
          cell,
          textWidth + padding * 2,
          textHeight,
        );

        // 텍스트 그리기
        ctx.font = `${textHeight}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.ball.color;
        ctx.fillText(text, xPosition, cell);
        ctx.stroke();
      }
      requestAnimationFrame(animateCallback);
    };
    requestAnimationFrame(animateCallback);
  }

  update(
    gameMap: GameMap,
    ball: Ball,
    gamePlayers: { [socketId: string]: GamePlayer },
  ) {
    this.gameMap = gameMap;
    this.ball = ball;
    this.gamePlayers = gamePlayers;
  }
}
