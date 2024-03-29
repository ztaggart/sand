<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Grid from '../grids/Grid';
import { type RGBColor, ColorTheme } from '@/types/Color';

const WIDTH = 700;
const HEIGHT = 700;
const CELL_SIZE = 5;
const WIDTH_CELLS = WIDTH / CELL_SIZE;
const HEIGHT_CELLS = HEIGHT / CELL_SIZE;

const props = defineProps<{
  mouseDown: boolean;
  initialColor: RGBColor;
  colorTheme: ColorTheme | null;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const grid = ref<Grid>(new Grid(WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE));
const left = ref(false);
const mousePos = ref({ x: 0, y: 0 });
const currentColor = ref(props.initialColor);
const reqId = ref(0);

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

onUnmounted(() => {
  cancelAnimationFrame(reqId.value);
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

  reqId.value = requestAnimationFrame(animate);
}

function drawSquare(x: number, y: number) {
  if (!context.value) {
    alert('something wrong, no context');
  }

  let cellXPos = Math.floor(x / CELL_SIZE); // % WIDTH_CELLS;
  let cellYPos = Math.floor(y / CELL_SIZE); // % HEIGHT_CELLS;

  if (props.colorTheme) {
    updateColorTheme();
  } else {
    currentColor.value = props.initialColor;
  }

  let { red, green, blue } = currentColor.value;

  blue = blue + (Math.random() - 0.5) * 15;
  green = green + (Math.random() - 0.5) * 15;
  red = red + (Math.random() - 0.5) * 15;

  //update model
  grid.value.insertCell(cellXPos, cellYPos, { red, green, blue });
}

/**
 * If there's a theme, then update the current sand color based on that theme
 */
function updateColorTheme() {
  if (props.colorTheme === ColorTheme.RAINBOW) {
    let rand = Math.random() * 4;
    let color = currentColor.value;
    // to loop through colors:
    // start at 255 0 0, then green to 255, then red to 0, then blue to 255,
    // then green to 0, then red to 255, then blue to 0, and repeat
    // https://stackoverflow.com/questions/29229713/iterating-over-rgb-continuously
    if (color.red >= 255 && color.blue === 0 && color.green < 255) {
      //todo: keep more yellow, slow down the speed at which it becomes green
      //increase green
      currentColor.value = {
        red: color.red,
        green: Math.min(color.green + (color.green < 150 ? rand : rand - 1), 255),
        blue: color.blue
      };
    } else if (color.green >= 255 && color.red > 0) {
      //decrease red
      currentColor.value = {
        red: Math.max(color.red - rand, 0),
        green: color.green,
        blue: color.blue
      };
    } else if (color.green >= 255 && color.red === 0 && color.blue < 255) {
      //increase blue
      currentColor.value = {
        red: color.red,
        green: color.green,
        blue: Math.min(color.blue + rand + 1, 255) // speed up
      };
    } else if (color.blue >= 255 && color.green > 0) {
      //decrease green
      currentColor.value = {
        red: color.red,
        green: Math.max(color.green - rand, 0),
        blue: color.blue
      };
    } else if (color.blue >= 255 && color.green === 0 && color.red < 255) {
      // increase red
      currentColor.value = {
        red: Math.min(color.red + rand - 1.25, 255), //slow it down
        green: color.green,
        blue: color.blue
      };
    } else if (color.red >= 255 && color.blue > 0) {
      // decrease blue
      currentColor.value = {
        red: color.red,
        green: color.green,
        blue: Math.max(color.blue - rand, 0)
      };
    } else {
      // start with red
      currentColor.value = {
        red: 255,
        green: 0,
        blue: 0
      };
    }
  } else if (props.colorTheme === ColorTheme.VOLCANIC) {
    let rand = Math.random();
    if (rand < 0.025) {
      currentColor.value = { red: 79, green: 14, blue: 0 };
    } else {
      currentColor.value = { red: 51, green: 46, blue: 46 };
    }
  } else if (props.colorTheme === ColorTheme.GUAC) {
    let rand = Math.random();
    if (rand < 0.035) {
      currentColor.value = { red: 245, green: 62, blue: 42 }; // red
    } else if (0.035 <= rand && rand <= 0.07) {
      currentColor.value = { red: 208, green: 67, blue: 240 }; // purple
    } else {
      currentColor.value = { red: 150, green: 201, blue: 60 }; //green
    }
  }
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
./Grid ../grids/Grid
