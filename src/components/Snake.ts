import gameConfig from '../config/game.config';

class Snake {
  length = 3;

  speed = 0;

  constructor() {
    this.length = 3;
    this.speed = gameConfig.initialSpeed;
  }
}

export default Snake;
