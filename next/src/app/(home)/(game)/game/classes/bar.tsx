import Position from './position';

export enum PlayerSide {
  LEFT,
  RIGHT,
}

export default class Bar {
  constructor(
    public position: Position,
    public side: PlayerSide,
    public color: string,
  ) {}
}
