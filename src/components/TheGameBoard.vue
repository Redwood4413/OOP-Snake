<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import Game from '../Game';
import gameConfig from '../config/game.config';

// export {};
// const ctx: Ref<CanvasRendereringContext2D | null> = ref(null);

const fpsCounter: Ref<HTMLSpanElement | null> | null = ref(null);

// const callInterval = ({ x, y }: Position) => {};

const fps = ref(0);
const width = ref(0);
const height = ref(0);

const resizeCanvas = () => {
  width.value = window.innerWidth - gameConfig.screen.padding;
  height.value = window.innerHeight - gameConfig.screen.padding;
};

resizeCanvas();

onMounted(() => {
  const game = new Game();
  game.init();
});
</script>

<template>
  <span class="fps-counter" ref="fpsCounter"> fps: {{ fps }} </span>
  <canvas :width="width" :height="height"></canvas>
</template>

<style scoped>
canvas {
  background: var(--clr-theme-primary-darker);
  border: 3px solid var(--clr-theme-accent);
}
</style>
