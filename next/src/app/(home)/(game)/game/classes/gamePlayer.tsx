import { Socket } from 'socket.io-client';
import Bar, { PlayerSide } from './bar';

export enum UserStatus {
  ONLINE,
  OFFLINE,
}

export default class GamePlayer {
  constructor(
    public bar: Bar,
    public socket: Socket,
    public nickname: string,
    public status: UserStatus,
    public score: number,
    public side: PlayerSide,
  ) {}
}
