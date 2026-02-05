import type BodyPart from './BodyPart';
import Config from './Config';
import type Game from './Game';
import GameState from './GameState';
import Head from './Head';
import Renderer from './Renderer';
import Tail from './Tail';

class Snake {
  Game;

  Head;

  Tail;

  tiles: BodyPart[] = [];

  intervalId = 0;

  constructor(Game: Game) {
    this.Game = Game;
    this.Head = new Head(this);
    this.Tail = new Tail(this);
    this.tiles.unshift(this.Head);
    Renderer.instance.add(...this.tiles);
  }

  private callMoveInterval() {
    const { speed } = Config.instance.snake;
    const size = this.Head.getSize();
    // return;
    this.intervalId = setInterval(() => {
      this.Tail.updatePos();
      switch (this.Head.getCurrentDirection()) {
        case 'up':
          this.Head.updatePos('y', -size);
          break;
        case 'down':
          this.Head.updatePos('y', size);
          break;
        case 'left':
          this.Head.updatePos('x', -size);
          break;
        case 'right':
          this.Head.updatePos('x', size);
          break;
        default:
          break;
      }
      //  this.Head.Collision.isCollision(),
    }, 1000 / speed);
  }

  private clearMoveInterval() {
    clearInterval(this.intervalId);
  }

  start() {
    this.callMoveInterval();
  }

  stop() {
    this.clearMoveInterval();
  }

  setDirection(value: Direction) {
    if (!value) return;
    this.Head.turn(value);
  }
}
export default Snake;
