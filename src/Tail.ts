import gameConfig from './config/game.config';
import type Snake from './Snake';
import TailTile from './TailTile';

class Tail {
  length = gameConfig.snake.length;

  Snake;

  constructor(Snake: Snake) {
    this.Snake = Snake;
    this.init();
  }

  init() {
    for (let i = 1; i <= this.length; i += 1) {
      console.log(i);
      const tile = new TailTile(this, i);
      this.Snake.tiles.push(tile);
    }
  }

  grow() {
    this.length += 1;
  }

  getHeadPos() {
    return this.Snake.tiles[0].getPos();
  }

  updatePos() {
    for (let i = 0; i <= this.Snake.tiles.length - 2; i += 1) {
      this.Snake.tiles[i].follow();
    }
    console.log(this.Snake.tiles);
  }

  setPos(index: number, pos: Position) {
    this.Snake.tiles[index]?.setPos(pos);
  }
}

export default Tail;
