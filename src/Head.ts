import BodyPart from './BodyPart';
import KeyBuffer from './KeyBuffer';
import Renderer from './Renderer';
import type Snake from './Snake';

class Head extends BodyPart {
  Snake;

  buffer = KeyBuffer.getBuffer();

  lastDirection: Direction;

  pos = {
    x: Renderer.instance.getMiddleOfCanvas().x,
    y: Renderer.instance.getMiddleOfCanvas().y,
  };

  constructor(Snake: Snake) {
    super();
    this.Snake = Snake;
    // this.Snake.registerTiles(this);
    this.lastDirection = this.buffer[this.buffer.length - 1];
  }

  turn(to: Direction) {
    const from = this.buffer[this.buffer.length]
      ? this.buffer[this.buffer.length - 1]
      : this.lastDirection;
    if (!Head.isProperTurn(from, to)) return;

    KeyBuffer.addDirectionToBuffer(to);
    this.lastDirection = to;
  }

  static isProperTurn(from: Direction, to: Direction) {
    if (from === 'up' && to === 'down') return false;
    if (from === 'down' && to === 'up') return false;
    if (from === 'left' && to === 'right') return false;
    if (from === 'right' && to === 'left') return false;
    if (from === to) return false;
    return true;
  }

  getDirection() {
    const { length } = this.buffer;
    const direction =
      length > 0 ? this.buffer[0] : this.lastDirection;
    KeyBuffer.popFirst();

    return direction;
  }
}
export default Head;
