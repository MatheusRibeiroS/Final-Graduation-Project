import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  return useLocalStorage<Theme>('theme', 'light');
}