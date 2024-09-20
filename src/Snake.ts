import type BodyPart from './BodyPart';
import Config from './Config';
import gameConfig from './config/game.config';
import Head from './Head';
import Renderer from './Renderer';
import Tail from './Tail';

class Snake {
  Head;

  Tail;

  tiles: BodyPart[] = [];

  constructor() {
    this.Head = new Head(this);
    this.Tail = new Tail(this);
    this.tiles.unshift(this.Head);
    Renderer.instance.add(...this.tiles);
    this.move();
  }

  move() {
    const { size, updatePos } = this.Head;
    const { speed } = gameConfig.snake;
    setInterval(() => {
      this.Tail.updatePos();
      switch (this.Head.getDirection()) {
        case 'up':
          updatePos('y', -size);
          break;
        case 'down':
          updatePos('y', size);
          break;
        case 'left':
          updatePos('x', -size);
          break;
        case 'right':
          updatePos('x', size);
          break;
        default:
          break;
      }
    }, 1000 / speed);
  }

  setDirection(value: Direction) {
    this.Head.turn(value);
  }
}
export default Snake;
