const gameConfig = {
  snake: {
    speed: 50, // 'ticks' per second
    size: 20, // px
    length: 20,
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
  allowedKeyCodes: [
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'KeyW',
    'KeyS',
    'KeyA',
    'KeyD',
  ],
  screen: {
    padding: 50, // px
  },
};
export default gameConfig;
