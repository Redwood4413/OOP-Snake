import Config from './Config';
import PositionUtils from './PositionUtils';

abstract class GameElement {
  abstract type: string;

  private pos: Position;

  private color: string;

  private size: number;

  constructor(
    pos: Position = { x: 0, y: 0 },
    color = Config.instance.snake.color,
    size = Config.instance.snake.size,
  ) {
    this.pos = PositionUtils.alignPosToPseudoGrid(pos);
    this.color = color;
    this.size = size;
  }

  getPos() {
    return this.pos;
  }

  setPos(newPos: Position) {
    this.pos = PositionUtils.alignPosToPseudoGrid(newPos);
  }

  setColor(color: string) {
    const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    if (!regex.test(color)) {
      throw new Error(`Wrong HEX color code: ${color}.`);
    }
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  getSize() {
    return this.size;
  }
}
export default GameElement;
