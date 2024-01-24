export interface Color {
  red: number;
  blue: number;
  green: number;
}

export interface Cell {
  color: Color;
  occupied: boolean;
}

export const EMPTY_COLOR = { red: 0, blue: 0, green: 0 };

export const SAND_COLOR = { red: 256, green: 256, blue: 0 };
