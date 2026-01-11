/**
 * LocalStorage utility functions for persistent storage
 */

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error('Error loading from localStorage:', err);
    return null;
  }
};

export const saveToLocalStorage = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing from localStorage:', err);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error('Error clearing localStorage:', err);
  }
};
