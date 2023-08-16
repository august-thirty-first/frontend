import { Socket } from 'socket.io-client';

enum MapType {
  DEFAULT,
  NEW,
}

enum MapDifficulty {
  EASY,
  HARD,
}

enum PlayerSide {
  LEFT,
  RIGHT,
}

enum UserStatus {
  ONLINE,
  OFFLINE,
}

interface GameMap {
  type: MapType;
  difficulty: MapDifficulty;
}

interface Position {
  x: number;
  y: number;
}

interface Ball {
  position: Position;
  color: string;
}

interface Bar {
  position: Position;
  side: PlayerSide;
  color: string;
}

interface GamePlayer {
  bar: Bar;
  socket: Socket;
  nickname: string;
  status: UserStatus;
  score: number;
  side: PlayerSide;
}

interface Props {
  gameMap: GameMap;
  ball: Ball;
  gamePlayers: GamePlayer[];
}
export default class RenderInfo {
  constructor() {} // private props: Props,

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

  update(props: Props) {
    // this.props = props;
  }
}
