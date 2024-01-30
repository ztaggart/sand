import Grid from '@/grids/Grid';
export class BottomlessGrid extends Grid {
  override updateGrid() {
    for (let j = this.height - 1; j >= 0; j--) {
      for (let i = this.width - 1; i >= 0; i--) {
        if (j >= this.height - 1) {
          this.grid[i][j] = {
            occupied: false,
            color: { red: 0, green: 0, blue: 0 }
          };
        } else {
          const tmp = this.grid[i][j + 1];
          this.grid[i][j + 1] = this.grid[i][j];
          this.grid[i][j] = tmp;
        }
      }
    }
  }
}
