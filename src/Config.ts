import gameConfig from './config/game.config';

class Config {
  static #instance: Config;

  #keyboard;

  #snake;

  #screen;

  private constructor() {
    this.#keyboard = gameConfig.keyboard;
    this.#snake = gameConfig.snake;
    this.#screen = gameConfig.screen;
  }

  public static get instance() {
    if (!Config.#instance) {
      this.#instance = new Config();
    }
    return Config.#instance;
  }

  public get snake() {
    const setRange = (size: number) =>
      // eslint-disable-next-line no-nested-ternary
      size > 100 ? 100 : size < 1 ? 1 : size;

    return {
      ...this.#snake,
      size: parseInt(`${setRange(this.#snake.size)}`, 10),
    };
  }

  public get keyboard() {
    return this.#keyboard;
  }

  public get screen() {
    return this.#screen;
  }
}
export default Config;
