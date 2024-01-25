export interface RGBColor {
  red: number;
  blue: number;
  green: number;
}

export type Color = RGBColor | HexColor;

export interface HexColor {
  hexValue: string;
}

export interface Cell {
  color: RGBColor;
  occupied: boolean;
}

export const EMPTY_COLOR = { red: 0, blue: 0, green: 0 };

export const SAND_COLOR = { red: 217, green: 160, blue: 63 };
export const SAND_HEX_COLOR = '#d9a13f';

export enum ColorTheme {
  RAINBOW = 'RAINBOW',
  VOLCANIC = 'VOLCANIC'
}
