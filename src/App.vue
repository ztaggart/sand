<script setup lang="ts">
import { ref } from 'vue';
import Canvas from './components/SandCanvas.vue';

const mouseDown = ref(false);

function handleClick(event: MouseEvent) {
  if (event.button === 0) {
    mouseDown.value = true;
  }
}
</script>

<template>
  <div
    @mousedown="handleClick"
    @mouseup="mouseDown = false"
    class="hw-100 flex-middle sand-background"
  >
    <div class="flex-vertical">
      <div class="flex-middle flex-vertical">
        <h1>SAND</h1>
        <p>Left click to draw, right click to clear</p>
      </div>
      <Canvas :mouse-down="mouseDown"></Canvas>
    </div>
  </div>
</template>

<style scoped>
.flex-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-vertical {
  display: flex;
  flex-direction: column;
}

.hw-100 {
  height: 100%;
  width: 100%;
}

.sand-background {
  background-image: url('sand_background.png');
}
</style>
