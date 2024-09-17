import BodyPart from './BodyPart';
import gameConfig from './config/game.config';
import type Tail from './Tail';

class TailTile extends BodyPart {
  tail;

  id;

  constructor(tail: Tail, id: number) {
    super();
    this.tail = tail;
    this.id = id;
  }

  getPreviousTilePos() {
    if (this.id === gameConfig.snake.length)
      return this.tail.getHeadPos();
    return this.tail.Snake.tiles[this.id + 1].getPos();
  }

  follow() {
    console.log(this.getPreviousTilePos());
    this.setPos(this.getPreviousTilePos());
  }
}
export default TailTile;
