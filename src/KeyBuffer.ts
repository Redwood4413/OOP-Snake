class KeyBuffer {
  buffer: Direction[] = [];

  size = 4;

  constructor() {
    this.buffer.push('right');
  }

  addDirectionToBuffer(direction: Direction) {
    const { size, buffer } = this;
    if (buffer.length < size) buffer.push(direction);
  }

  popFirst() {
    this.buffer.shift();
  }
}
export default KeyBuffer;
