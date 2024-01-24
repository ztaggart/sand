export interface Color {
  red: number;
  blue: number;
  green: number;
}

export interface HexColor {
  hexValue: string;
}

export interface Cell {
  color: RGBColor | HexColor;
  occupied: boolean;
}

export const EMPTY_COLOR = { red: 0, blue: 0, green: 0 };

export const SAND_COLOR = { red: 217, green: 160, blue: 63 };
