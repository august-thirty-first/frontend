import { Socket } from 'socket.io-client';
import Bar, { PlayerSide } from './bar';

export enum UserStatus {
  ONLINE,
  OFFLINE,
}

export default class GamePlayer {
  public socketId: string = '';
  public nickName: string = '';
  public status: UserStatus = 0;
  public score: number = 0;
  public side: PlayerSide = 0;
  public bar: Bar = new Bar();
}
