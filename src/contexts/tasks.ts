import { atom } from 'jotai';
import type { Task } from '../types/task';

export const tasksAtom = atom<Task[]>([]);
export const selectedTaskAtom = atom<Task | null>(null);

export const themeAtom = atom<"light" | "dark">("light");
