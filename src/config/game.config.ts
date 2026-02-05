const gameConfig = {
  snake: {
    speed: 5, // 'ticks' per second
    size: 15, // integer px, 1-100: this value also determines the grid size
    length: 3,
    color: '#826381',
  },
  keyboard: {
    mapping: {
      up: ['ArrowUp', 'KeyW'],
      down: ['ArrowDown', 'KeyS'],
      left: ['ArrowLeft', 'KeyA'],
      right: ['ArrowRight', 'KeyD'],
    } as { [key in Direction]: KeyboardEvent['code'][] },
  },
  screen: {
    gridSize: 1, // 'x' times 16px, 1-3
    padding: 50, // px
  },
};
export default gameConfig;
