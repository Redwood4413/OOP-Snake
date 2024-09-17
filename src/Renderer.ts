import BodyPart from './BodyPart';

class Renderer {
  static #instance: Renderer;

  stack: BodyPart[] = [];

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

  add(...parts: BodyPart[]) {
    this.stack.push(...parts.flat());
  }

  getStack() {
    return this.stack;
  }

  getMiddleOfCanvas(): Position {
    return { x: this.canvas.width / 2, y: this.canvas.height / 2 };
  }

  render() {
    this.clear();
    this.getStack().forEach((body) => {
      const pos = body.getPos();
      const { size, color } = body;
      this.context.fillStyle = color;
      this.context.fillRect(pos.x, pos.y, size, size);
    });
  }

  clear = () => {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  };
}
export default Renderer;
