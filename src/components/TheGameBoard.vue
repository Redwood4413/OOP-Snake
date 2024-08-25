<script setup lang="ts">
import { Ref, computed, onMounted, ref } from 'vue';

const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null);
const fpsCounter: HTMLSpanElement | null = ref(null);
const msMovingSpeed = 300;
const intervalsArray: number[] = [];
let currentKeyDownArr: string[] = [];
const headSize = 25;
const snakeLength = 0;

const isMoveKey = (action: string) => {
  if (
    action !== 'ArrowLeft' &&
    action !== 'ArrowRight' &&
    action !== 'ArrowDown'
  ) {
    return false;
  }

  return true;
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (!isMoveKey(event.key)) return;
  // console.log(event);
  if (event.repeat) return;

  currentKeyDownArr = currentKeyDownArr.filter(
    (key) => key !== event.key,
  );
  console.log(`keyup: ${event.key}`);
};
const callInterval = ({ x, y }: Position) => {};

const pos: Position = {
  x: 0,
  y: 0,
};

const moveLoop = () => {};

type Position = {
  x: number;
  y: number;
};

const draw = () => {
  if (!ctx.value) return;

  ctx.value.fillRect(pos.x, pos.y, headSize, headSize);
  ctx.value.fillStyle = '#ffff00';
};

setInterval(() => {
  pos.x += headSize;
  pos.y += headSize;
}, 1000);

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
    canvasElement.value?.width,
    canvasElement.value?.height,
  );
  draw();
  window.requestAnimationFrame(gameLoop);
};

const init = () => {
  window.requestAnimationFrame(gameLoop);
};

const move = (direction: 'right' | 'left' | 'down') => {
  const updatePos = ({ x, y }: Position) => {
    callInterval({ x, y });
  };
  switch (direction) {
    case 'right':
      updatePos({ x: 1, y: 0 });
      break;
    case 'left':
      updatePos({ x: -1, y: 0 });
      break;
    case 'down':
      updatePos({ x: 0, y: -1 });
      break;
    default:
      break;
  }
};
const checkIfInArray = (str: string) => {
  return currentKeyDownArr.includes(str);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (!isMoveKey(event.key)) return;
  if (checkIfInArray(event.key)) return;
  if (event.repeat) return;

  currentKeyDownArr.push(event.key);

  console.log(`keydown: ${event.key}`);
  switch (event.key) {
    case 'ArrowRight':
      move('right');
      break;
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowDown':
      move('down');
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
  ctx.value = canvasElement.value?.getContext('2d') || null;
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  init();
});
</script>

<template>
  <span class="fps-counter" ref="fpsCounter"> fps: {{ fps }} </span>
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
