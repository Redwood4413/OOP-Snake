// import GameElement from './GameElement';
import Snake from './Snake';
import Renderer from './Renderer';
import GameState from './GameState';
import Config from './Config';
import Food from './Food';
import Field from './Field';

class Game {
  static #instance: Game;

  fps = 0;

  secondsPassed = 0;

  Snake: Snake;

  Renderer;

  State: GameState;

  Field;

  private constructor() {
    this.Field = new Field();
    this.Field.onWindowResize();
    this.Snake = new Snake(this);
    this.State = GameState.instance;
    this.Renderer = Renderer.instance;
    this.init();
  }

  public static reset() {
    this.#instance = this.instance;
  }

  public static get instance() {
    if (!this.#instance) {
      this.#instance = new Game();
    }
    return this.#instance;
  }

  private static onKeyPress(event: KeyboardEvent) {
    const { mapping } = Config.instance.keyboard;

    const transformKeyToDirection = (): Direction => {
      return Object.keys(mapping).find((key) =>
        mapping[key as Direction].includes(event.code),
      ) as Direction;
    };
    Game.instance.Snake.setDirection(transformKeyToDirection());
  }

  private init() {
    this.Snake.start();
    const food = new Food(this.Field);
    window.addEventListener('keydown', Game.onKeyPress);
    window.requestAnimationFrame(Game.loop);
  }

  private static loop() {
    // this.secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
    //  oldTimeStamp = timeStamp;
    // this.fps = Math.round(1 / secondsPassed);
    Game.instance.Renderer.render();
    window.requestAnimationFrame(Game.loop);
  }
}

export default Game;
