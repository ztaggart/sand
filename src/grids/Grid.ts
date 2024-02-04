import { type RGBColor, type Cell, EMPTY_COLOR } from '@/types/Color';
// cell size in pixels

export default class Grid {
  width: number;
  height: number;
  cellSize: number;
  grid: Cell[][];

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.grid = new Array(width);
    for (let i = 0; i < width; i++) {
      this.grid[i] = new Array<Cell>(height).fill({
        occupied: false,
        color: EMPTY_COLOR
      });
    }
  }

  updateGrid() {
    for (let j = this.height - 1; j >= 0; j--) {
      for (let i = this.width - 1; i >= 0; i--) {
        if (!this.grid[i][j].occupied) {
          continue;
        }
        // if there is a cell below and it's empty, switch them. (cell falls down)
        if (j < this.height - 1 && !this.grid[i][j + 1].occupied) {
          const tmp = this.grid[i][j + 1];
          this.grid[i][j + 1] = this.grid[i][j];
          this.grid[i][j] = tmp;
        } else if (
          // if cell to bottom left and bottom right is empty and cell below isn't,
          // put in in one of them
          j < this.height - 1 &&
          i > 0 &&
          !this.grid[i - 1][j + 1].occupied &&
          i < this.width - 1 &&
          !this.grid[i + 1][j + 1].occupied
        ) {
          const rnd = Math.random();
          if (rnd < 0.5) {
            const tmp = this.grid[i - 1][j + 1];
            this.grid[i - 1][j + 1] = this.grid[i][j];
            this.grid[i][j] = tmp;
          } else {
            const tmp = this.grid[i + 1][j + 1];
            this.grid[i + 1][j + 1] = this.grid[i][j];
            this.grid[i][j] = tmp;
          }
        } else if (j < this.height - 1 && i > 0 && !this.grid[i - 1][j + 1].occupied) {
          // if bottom left empty, swap with bottom left
          const tmp = this.grid[i - 1][j + 1];
          this.grid[i - 1][j + 1] = this.grid[i][j];
          this.grid[i][j] = tmp;
        } else if (j < this.height - 1 && i < this.width - 1 && !this.grid[i + 1][j + 1].occupied) {
          // if bottom right empty, swap bottom right
          const tmp = this.grid[i + 1][j + 1];
          this.grid[i + 1][j + 1] = this.grid[i][j];
          this.grid[i][j] = tmp;
        }
      }
    }
  }

  insertCell(xpos: number, ypos: number, color: RGBColor) {
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
        if (!cell.occupied) {
          continue;
        }
        if (cell.occupied) {
          context.fillStyle = `rgb(${cell.color.red} ${cell.color.green} ${cell.color.blue})`;
          context.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
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
