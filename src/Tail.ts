import BodyPart from './BodyPart';
import Config from './Config';
import gameConfig from './config/game.config';
import type Snake from './Snake';

class Tail {
  length = gameConfig.snake.length;

  Snake;

  constructor(Snake: Snake) {
    this.Snake = Snake;
    this.init();
  }

  init() {
    const { size } = Config.instance.snake;
    const headPos = this.getHeadPos();
    for (let i = 1; i <= this.length; i += 1) {
      const tile = new BodyPart();
      tile.setPos({ x: headPos.x - size * i, y: headPos.y });
      this.Snake.tiles.push(tile);
    }
  }

  grow() {
    this.length += 1;
  }

  getHeadPos() {
    return this.Snake.Head.getPos();
  }

  updatePos() {
    const lastTile = this.Snake.tiles.pop()!;

    this.Snake.tiles.splice(1, 0, lastTile);

    lastTile.setPos(this.getHeadPos());
  }
}

export default Tail;
