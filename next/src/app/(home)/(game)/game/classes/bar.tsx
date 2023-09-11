import Coordinate from './coordinate';

export enum PlayerSide {
  LEFT,
  RIGHT,
}

export default class Bar {
  public side: PlayerSide = 0;
  public color: string = '';
  public position: Coordinate = new Coordinate();
  public velocity: Coordinate = new Coordinate();
  public width: number = 0;
  public length: number = 0;
}
