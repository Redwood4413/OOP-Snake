import BodyPart from './BodyPart';
import Collision from './Collision';
import Config from './Config';
import Field from './Field';
import GameElement from './GameElement';
import KeyBuffer from './KeyBuffer';
import PositionUtils from './PositionUtils';
import Renderer from './Renderer';
import type Snake from './Snake';

class Head extends BodyPart {
  Snake;

  KeyBuffer;

  buffer: Direction[] = [];

  Collision;

  Renderer;

  constructor(Snake: Snake) {
    super();
    this.KeyBuffer = new KeyBuffer();
    this.buffer = this.KeyBuffer.buffer;
    this.Snake = Snake;
    this.setPos({
      x: this.Snake.Game.Field.getMiddleOfCanvas().x,
      y: this.Snake.Game.Field.getMiddleOfCanvas().y,
    });
    this.setColor('#FF0000');
    this.Renderer = Renderer.instance;
    this.Collision = new Collision(this);
  }

  getElementsOnTheSameAxis(axis: keyof Position, position: number) {
    return this.Renderer.getStack().filter(
      (element) => element.getPos()[axis] === position,
    );
  }

  turn(to: Direction) {
    const from = this.buffer[this.buffer.length - 1];
    if (!Head.isProperTurn(from, to)) return;

    this.KeyBuffer.addDirectionToBuffer(to);
  }

  static isProperTurn(from: Direction, to: Direction) {
    if (from === 'up' && to === 'down') return false;
    if (from === 'down' && to === 'up') return false;
    if (from === 'left' && to === 'right') return false;
    if (from === 'right' && to === 'left') return false;
    if (from === to) return false;
    return true;
  }

  getCurrentDirection() {
    if (this.buffer.length > 1) this.clearUsedDirection();

    return this.buffer[0];
  }

  clearUsedDirection() {
    this.KeyBuffer.popFirst();
    const found = this.getElementsOnTheSameAxis('x', this.getPos().x);
  }
}
export default Head;
