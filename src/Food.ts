import type Field from './Field';
import GameElement from './GameElement';
import PositionUtils from './PositionUtils';
import Renderer from './Renderer';

const randomNumInRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

class Food extends GameElement {
  type = 'food';

  Field;

  Renderer;

  constructor(Field: Field) {
    super();
    this.Field = Field;
    this.Renderer = Renderer.instance;

    this.setColor('#00FF00');
    this.#init();
  }

  #init(): void {
    const pos = this.getRandomPos();
    if (this.isAllowedToSpawn(pos)) {
      return this.spawn(pos);
    }
    return this.#init();
  }

  spawn(at: Position) {
    this.setPos(at);
    this.Renderer.add(this);
  }

  getRandomPos() {
    const { width, height } = this.Field.getDimensions();
    const pos = {
      x: randomNumInRange(0, width),
      y: randomNumInRange(0, height),
    };
    return PositionUtils.alignPosToPseudoGrid(pos);
  }

  isAllowedToSpawn(pos: Position) {
    return !this.Renderer.getStack().find((element) =>
      PositionUtils.arePositionsEqual(element.getPos(), pos),
    );
  }
}
export default Food;
