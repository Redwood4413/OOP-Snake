<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import Game from '../Game';
import Renderer from '../Renderer';
import GameState from '../GameState';

const fpsCounter = ref<HTMLSpanElement>();

const fps = ref(0);
const width = ref(0);
const height = ref(0);

onMounted(() => {
  const game = Game.instance;
  const canvasResize = () => {
    const { Field } = game;
    Field.onWindowResize();
    width.value = Field.getDimensions().width;
    height.value = Field.getDimensions().height;
  };
  canvasResize();
  window.addEventListener('resize', () => canvasResize());
});
if (import.meta.hot) {
  import.meta.hot.accept(async () => {
    Game.reset();
    Renderer.reset();
  });
}
</script>

<template>
  <div class="main">
    <!-- <span class="fps-counter" ref="fpsCounter"> fps: {{ fps }} </span> -->
    <div class="overlay" v-if="GameState.instance.isStopped()"
      >{{ width }} x {{ height }}</div
    >
    <canvas :width="width" :height="height"> </canvas>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  position: relative;
}
canvas {
  background: var(--clr-theme-primary-darker);
  border: 3px solid var(--clr-theme-accent);
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
}
</style>
