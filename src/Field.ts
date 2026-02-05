import Config from './Config';

class Field {
  // static #instance: Field;

  canvas: HTMLCanvasElement;

  width: number = 0;

  height: number = 0;

  constructor() {
    this.canvas = document.querySelector('canvas')!;
    this.init();
  }

  init() {
    this.onWindowResize();
  }
  // public static get instance() {
  //   if (!Field.#instance) {
  //     Field.#instance = new Field();
  //   }
  //   return Field.#instance;
  // }

  onWindowResize() {
    const screen = {
      x: window.innerWidth - Config.instance.screen.padding,
      y: window.innerHeight - Config.instance.screen.padding,
    };
    const rest = {
      x: screen.x % Config.instance.snake.size,
      y: screen.y % Config.instance.snake.size,
    };
    this.width = screen.x - rest.x;
    this.height = screen.y - rest.y;
  }

  getMiddleOfCanvas(): Position {
    const middlePoint = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
    return middlePoint;
  }

  getDimensions() {
    return { width: this.width, height: this.height };
  }
}
export default Field;
