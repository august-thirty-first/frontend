import Ball from './classes/ball';
import { GameMap } from './classes/gameMap';
import GamePlayer from './classes/gamePlayer';

export default class RenderInfo {
  public gamePlayers: GamePlayer[] = new Array<GamePlayer>();
  public ball: Ball = new Ball();
  public gameMap: GameMap = new GameMap();

  draw(ctx: CanvasRenderingContext2D) {
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
    ctx.fillStyle = 'rgb(102, 103, 171)';
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 10, 0, 10);
    ctx.fill();

    //player1
    ctx.fillStyle = 'rgb(102, 103, 171)';
    ctx.fillRect(
      (ctx.canvas.width / 64) * 2,
      ctx.canvas.height / 4,
      ctx.canvas.width / 64,
      ctx.canvas.height / 2,
    );

    //player2
    ctx.fillStyle = 'rgb(102, 103, 171)';
    ctx.fillRect(
      (ctx.canvas.width / 64) * (64 - 2 /*벽으로부터의 거리*/ - 1) /*너비*/,
      ctx.canvas.height / 4,
      ctx.canvas.width / 64,
      ctx.canvas.height / 2,
    );
  }

  update(gameMap: GameMap, ball: Ball, gamePlayers: GamePlayer[]) {
    this.gameMap = gameMap;
    this.ball = ball;
    this.gamePlayers = gamePlayers;
  }
}
