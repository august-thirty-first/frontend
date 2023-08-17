import Ball from './classes/ball';
import { GameMap } from './classes/gameMap';
import GamePlayer from './classes/gamePlayer';

export default class RenderInfo {
  public gamePlayers: GamePlayer[] = new Array<GamePlayer>();
  public ball: Ball = new Ball();
  public gameMap: GameMap = new GameMap();

  animate(ctx: CanvasRenderingContext2D) {
    const animateCallback: FrameRequestCallback = timestamp => {
      //배경
      ctx.fillStyle = 'rgb(31, 31, 36)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //금
      ctx.fillStyle = 'rgb(102, 103, 171)';
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
      }
      requestAnimationFrame(animateCallback);
    };
    requestAnimationFrame(animateCallback);
  }

  update(gameMap: GameMap, ball: Ball, gamePlayers: GamePlayer[]) {
    this.gameMap = gameMap;
    this.ball = ball;
    this.gamePlayers = gamePlayers;
  }
}
