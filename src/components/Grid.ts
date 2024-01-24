import { type Color, type Cell, EMPTY_COLOR } from '@/types/Color';
// cell size in pixels
export const CELL_SIZE = 10;

export default class Grid {
  width: number;
  height: number;
  grid: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width);
    for (let i = 0; i < height; i++) {
      this.grid[i] = new Array<Cell>(height).fill({
        occupied: false,
        color: EMPTY_COLOR
      });
    }
  }

  updateGrid() {
    for (let i = this.width - 1; i >= 0; i--) {
      for (let j = this.height - 1; j >= 0; j--) {
        // if there is a cell below and it's empty, switch them. (cell falls down)
        if (j < this.height - 1 && !this.grid[i][j + 1].occupied) {
          const tmp = this.grid[i][j + 1];
          this.grid[i][j + 1] = this.grid[i][j];
          this.grid[i][j] = tmp;
        }
      }
    }
  }

  insertCell(xpos: number, ypos: number, color: Color) {
    if (xpos < 0 || xpos >= this.width || ypos < 0 || ypos >= this.height) {
      return;
    }
    this.grid[xpos][ypos] = { color, occupied: true };
  }

  redraw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        // if a cell is occupied, draw it
        const cell = this.grid[i][j];
        if (cell.occupied) {
          context.fillStyle = `rgb(${cell.color.red} ${cell.color.green} ${cell.color.blue})`;
          context.fillRect(i * CELL_SIZE, j * CELL_SIZE, 10, 10);
        }
      }
    }
  }

  clear() {
    for (let i = 0; i < this.height; i++) {
      this.grid[i] = new Array<Cell>(this.height).fill({
        occupied: false,
        color: EMPTY_COLOR
      });
    }
  }
}
