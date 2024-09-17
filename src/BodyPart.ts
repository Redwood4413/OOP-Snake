import gameConfig from './config/game.config';

class BodyPart {
  pos: Position;

  color: string;

  size: number;

  constructor(
    pos: Position = { x: 0, y: 0 },
    color = gameConfig.snake.color,
    size = gameConfig.snake.size,
  ) {
    this.pos = pos;
    this.color = color;
    this.size = size;
  }

  getPos() {
    return this.pos;
  }

  setPos(newPos: Position) {
    this.pos = newPos;
  }

  /* eslint no-return-assign: ["error", "except-parens"] */
  updatePos = (prop: keyof Position, value: number) =>
  (this.pos = {
    ...this.pos,
    [prop]: this.pos[prop] + value,
  });
}

export default BodyPart;
