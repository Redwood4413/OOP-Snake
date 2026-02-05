import GameElement from './GameElement';

class BodyPart extends GameElement {
  type = 'body';

  updatePos(axis: keyof Position, value: number) {
    const pos = this.getPos();
    this.setPos({ ...pos, [axis]: pos[axis] + value });
  }
}

export default BodyPart;
