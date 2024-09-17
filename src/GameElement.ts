import gameConfig from './config/game.config';

type Position = { x: number; y: number };

abstract class GameElement {
  // protected abstract rectangle;

  protected context: CanvasRendereringContext2D;

  allInstances: GameElement[] = [];

  pos: Position = {
    x: 0,
    y: 0,
  };

  constructor() {
    this.context = document
      .querySelector('canvas')
      ?.getContext('2d')!;
    this.allInstances.push(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getContext() {
    return this.context;
  }

  getInstances() {
    return this.allInstances;
  }

  getPos() {
    return this.pos;
  }

  setPos({ x, y }: Position) {
    this.pos.x = x;
    this.pos.y = y;
  }

  draw(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string = gameConfig.snake.color,
  ) {
    // console.log(this.context);
    this.context.fillRect(x, y, w, h);

    this.context.fillStyle = color;
  }
  // corners = {
  //   top: {
  //     left: {
  //       x: 0,
  //       y: 0,
  //     },
  //     right: {
  //       x: window.innerWidth,
  //       y: 0,
  //     },
  //   },
  //   bottom: {
  //     left: {
  //       x: 0,
  //       y: window.innerHeight,
  //     },
  //     right: {
  //       x: window.innerWidth,
  //       y: window.innerHeight,
  //     },
  //   },
  // };
}
export default GameElement;
