import type GameElement from './GameElement';

class Renderer {
  static #instance: Renderer;

  stack: GameElement[] = [];

  context: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  private constructor() {
    this.canvas = document.querySelector('canvas')!;
    this.context = this.canvas.getContext('2d')!;
  }

  public static get instance() {
    if (!Renderer.#instance) {
      Renderer.#instance = new Renderer();
    }
    return Renderer.#instance;
  }

  public static reset() {
    this.#instance = new Renderer();
  }

  add(...parts: GameElement[]) {
    this.stack.push(...parts.flat());
  }

  getStack() {
    return this.stack;
  }

  render() {
    this.clear();
    this.getStack().forEach((element) => {
      const pos = element.getPos();
      const size = element.getSize();
      const color = element.getColor();
      this.context.fillStyle = color;
      this.context.fillRect(pos.x, pos.y, size, size);
    });
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  }
}
export default Renderer;
