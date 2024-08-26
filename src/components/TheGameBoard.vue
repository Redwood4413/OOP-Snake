<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';

const canvasElement: Ref<HTMLCanvasElement> =
  ref() as Ref<HTMLCanvasElement>;
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const fpsCounter: Ref<HTMLSpanElement | null> | null = ref(null);
const msMovingSpeed = 300;
const intervalsArray: number[] = [];
const currentKeyDownArr: string[] = [];
const headSize = 25;
const snakeLength = 0;

const allowedKeyCodes: string[] = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'KeyW',
  'KeyS',
  'KeyA',
  'KeyD',
];
const isMoveKey = (key: string) => allowedKeyCodes.includes(key);

// const callInterval = ({ x, y }: Position) => {};

const pos: Position = {
  x: 0,
  y: 0,
};

type Position = {
  x: number;
  y: number;
};

const draw = () => {
  if (!ctx.value) return;

  ctx.value.fillRect(pos.x, pos.y, headSize, headSize);
  ctx.value.fillStyle = '#ffff00';
};

const fps = ref(0);
let oldTimeStamp = 0;
let secondsPassed = 0;

const gameLoop = (timeStamp: number) => {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  fps.value = Math.round(1 / secondsPassed);

  ctx.value?.clearRect(
    0,
    0,
    canvasElement.value.width,
    canvasElement.value.height,
  );
  draw();
  window.requestAnimationFrame(gameLoop);
};

const init = () => {
  window.requestAnimationFrame(gameLoop);
};
let direction = 'up';
const handleKeyDown = (event: KeyboardEvent) => {
  if (!isMoveKey(event.code)) return;

  switch (event.code) {
    case 'ArrowUp' && 'KeyW':
      direction = 'up';
      break;
    case 'ArrowDown' && 'KeyS':
      direction = 'down';
      break;
    case 'ArrowLeft' && 'KeyA':
      direction = 'left';
      break;
    case 'ArrowRight' && 'KeyD':
      direction = 'right';
      break;
    default:
      break;
  }
};

let canvHeight = window.innerHeight;
let canvWidth = window.innerWidth;
window.addEventListener('resize', () => {
  canvWidth = window.innerWidth;
  canvHeight = window.innerHeight;
});

onMounted(() => {
  ctx.value = canvasElement.value?.getContext('2d');
  document.addEventListener('keydown', handleKeyDown);
  init();
});
</script>

<template>
  <span class="fps-counter" ref="fpsCounter"> fps: {{ fps }} </span>
  <SnakeEntity :direction="direction"></SnakeEntity>
  <canvas
    :height="canvHeight - 50"
    :width="canvWidth - 50"
    ref="canvasElement">
  </canvas>
</template>

<style scoped>
canvas {
  background: var(--clr-theme-primary-darker);
  border: 3px solid var(--clr-theme-accent);
}
</style>
