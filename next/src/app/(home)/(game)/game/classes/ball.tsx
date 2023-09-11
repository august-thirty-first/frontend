import Coordinate from './coordinate';

export default class Ball {
  public position: Coordinate = new Coordinate();
  public velocity: Coordinate = new Coordinate();
  public color: string = '';
  public radius: number = 0;
}
