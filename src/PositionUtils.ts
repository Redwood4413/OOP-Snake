import Config from './Config';

class PositionUtils {
  static arePositionsEqual(a: Position, b: Position) {
    return a.x === b.x && a.y === b.y;
  }

  static alignPosToPseudoGrid(pos: Position) {
    const { size } = Config.instance.snake;
    return {
      x: Math.round(pos.x / size) * size,
      y: Math.round(pos.y / size) * size,
    };
  }
}
export default PositionUtils;
