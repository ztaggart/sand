<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Canvas from './components/SandCanvas.vue';
import { SAND_HEX_COLOR, SAND_COLOR, type RGBColor } from '@/types/Color';

const mouseDown = ref(false);
const color = ref<string>(SAND_HEX_COLOR);
// const colorPicker = ref<HTMLInputElement | null>(null);

// onMounted(() => {});

function handleClick(event: MouseEvent) {
  if (event.button === 0) {
    mouseDown.value = true;
  }
}

function changeColor(event: Event) {
  let target = event.target as HTMLInputElement;
  color.value = target.value;
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex: string): RGBColor {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : SAND_COLOR;
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
      <Canvas :mouse-down="mouseDown" :sand-color="hexToRgb(color)"></Canvas>
      <div class="button-container">
        <input type="color" @change="changeColor" v-model="color" />
      </div>
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
  background-image: url('../sand_background.png');
}
</style>
