// contexts/theme.ts
import { atom } from "jotai";

export type ThemeMode = "light" | "dark";

export const themeAtom = atom<ThemeMode>("light");

export const themePalette = {
  light: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    text: "#333",
    paper: "#ffffff",
    primary: "#1976d2",
    secondary: "#9c27b0",
  },
  dark: {
    background: "linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)",
    text: "#f5f5f5",
    paper: "#2d2d2d",
    primary: "#90caf9",
    secondary: "#ba68c8",
  },
};
