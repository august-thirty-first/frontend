import Ball from './classes/ball';
import { PlayerSide } from './classes/bar';
import { GameMap } from './classes/gameMap';
import GamePlayer from './classes/gamePlayer';

export default class RenderInfo {
  public gamePlayers: { [socketId: string]: GamePlayer } = {};
  public ball: Ball = new Ball();
  public gameMap: GameMap = new GameMap();

  animate(ctx: CanvasRenderingContext2D) {
    const animateCallback: FrameRequestCallback = () => {
      //배경
      ctx.fillStyle = 'rgb(31, 31, 36)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
        10,
      );
      ctx.fill();

      for (const id in this.gamePlayers) {
        ctx.fillStyle = this.gamePlayers[id].bar.color;
        ctx.fillRect(
          this.gamePlayers[id].bar.position.x,
          this.gamePlayers[id].bar.position.y,
          this.gamePlayers[id].bar.width,
          this.gamePlayers[id].bar.length,
        );

        ctx.beginPath();
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.ball.color;
        ctx.fillText(
          `${this.gamePlayers[id].nickName}: ${this.gamePlayers[id].score}`,
          this.gamePlayers[id].side === PlayerSide.LEFT ? ctx.canvas.width * (1 / 4) : ctx.canvas.width * (3 / 4),
          10,
        );
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
