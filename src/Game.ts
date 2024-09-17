// import GameElement from './GameElement';
import gameConfig from './config/game.config';
import GameElement from './GameElement';
import Snake from './Snake';
import Renderer from './Renderer';

class Game extends GameElement {
  fps = 0;

  secondsPassed = 0;

  canvas: HTMLCanvasElement;

  static snake: Snake;

  renderer: Renderer;

  static isMoveKey = (keyCode: string) =>
    gameConfig.allowedKeyCodes.includes(keyCode);

  constructor() {
    super();

    this.canvas = document.querySelector('canvas')!;
    window.addEventListener('keydown', Game.handleEvent);
    Game.snake = new Snake();
    this.renderer = Renderer.instance;
  }

  private static handleEvent(event: KeyboardEvent) {
    if (!Game.isMoveKey(event.code)) return;
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        Game.snake.setDirection('up');
        break;
      case 'KeyS':
      case 'ArrowDown':
        Game.snake.setDirection('down');
        break;
      case 'KeyA':
      case 'ArrowLeft':
        Game.snake.setDirection('left');
        break;
      case 'KeyD':
      case 'ArrowRight':
        Game.snake.setDirection('right');
        break;
      default:
        break;
    }
  }

  static getWindowDimensions = () => ({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  init() {
    const { padding } = gameConfig.screen;
    this.canvas.width = Game.getWindowDimensions().x - padding;
    this.canvas.height = Game.getWindowDimensions().y - padding;

    window.requestAnimationFrame(this.gameLoop);
  }

  gameLoop = () => {
    // this.secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
    // oldTimeStamp = timeStamp;
    // this.fps = Math.round(1 / secondsPassed);
    this.renderer.render();
    window.requestAnimationFrame(this.gameLoop);
  };
}

export default Game;
