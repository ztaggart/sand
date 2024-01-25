<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Grid from './Grid';
import { CELL_SIZE } from './Grid';
import { SAND_COLOR, type RGBColor } from '@/types/Color';

const WIDTH = 500;
const HEIGHT = 500;
const WIDTH_CELLS = WIDTH / CELL_SIZE;
const HEIGHT_CELLS = HEIGHT / CELL_SIZE;

const props = defineProps<{
  mouseDown: boolean;
  sandColor: RGBColor;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const grid = ref<Grid>(new Grid(WIDTH_CELLS, HEIGHT_CELLS));
const left = ref(false);
const mousePos = ref({ x: 0, y: 0 });

onMounted(() => {
  if (!canvas.value) {
    alert('canvas could not be created. something is wrong');
    return;
  }
  canvas.value?.focus();

  canvas.value.width = WIDTH;
  canvas.value.height = HEIGHT;

  let ctx = canvas.value.getContext('2d');
  if (ctx) {
    context.value = ctx;
  }
  animate();
});

function animate() {
  if (!context.value) {
    return;
  }
  //clear the screen
  context.value.clearRect(0, 0, innerWidth, innerHeight);
  if (props.mouseDown && !left.value) {
    drawSquare(mousePos.value.x, mousePos.value.y);
  }

  // update model
  grid.value.updateGrid();

  //redraw
  grid.value.redraw(context.value);

  requestAnimationFrame(animate);
}

function drawSquare(x: number, y: number) {
  if (!context.value) {
    alert('something wrong, no context');
  }

  let cellXPos = Math.floor(x / CELL_SIZE); // % WIDTH_CELLS;
  let cellYPos = Math.floor(y / CELL_SIZE); // % HEIGHT_CELLS;

  let { red, green, blue } = props.sandColor;

  blue = blue + (Math.random() - 0.5) * 15;
  green = green + (Math.random() - 0.5) * 15;
  red = red + (Math.random() - 0.5) * 15;

  //update model
  grid.value.insertCell(cellXPos, cellYPos, { red, green, blue });
}

function changeMousePos(event: MouseEvent) {
  if (event.offsetX < 0 || event.offsetY < 0) {
    return;
  }
  mousePos.value = { x: event.offsetX, y: event.offsetY };
}

function handleClick(event: MouseEvent) {
  // check if right click
  if (event.button === 2) {
    //clear everything
    grid.value.clear();
  }
}
</script>

<template>
  <canvas
    ref="canvas"
    id="canvas"
    @mousemove="changeMousePos"
    @mouseleave="left = true"
    @mouseenter="left = false"
    @mousedown="handleClick"
    @contextmenu.prevent
  />
</template>

<style scoped>
#canvas {
  background-color: lightgrey;
}
</style>
./Grid
