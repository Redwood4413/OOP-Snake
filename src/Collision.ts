import type BodyPart from './BodyPart';
import GameElement from './GameElement';
import PositionUtils from './PositionUtils';

class Collision {
  element;

  constructor(trackedElement: GameElement) {
    this.element = trackedElement;
  }

  isCollision(targets: GameElement[]) {
    return targets.find((target) =>
      PositionUtils.arePositionsEqual(
        this.element.getPos(),
        target.getPos(),
      ),
    );
  }
}
export default Collision;
