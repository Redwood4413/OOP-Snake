class KeyBuffer {
  static buffer: Direction[] = ['right'];

  static size = 4;

  static addDirectionToBuffer(direction: Direction) {
    const { size, buffer } = KeyBuffer;
    if (buffer.length < size) KeyBuffer.buffer.push(direction);
  }

  static getBuffer() {
    return KeyBuffer.buffer;
  }

  static popFirst() {
    if (this.buffer.length > 0) KeyBuffer.buffer.shift();
  }
}
export default KeyBuffer;
