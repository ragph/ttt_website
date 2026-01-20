/**
 * LocalStorage utility functions for persistent storage
 */

const isBrowser = typeof window !== 'undefined';

export const loadFromLocalStorage = <T>(key: string): T | null => {
  if (!isBrowser) {
    return null;
  }
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
  if (!isBrowser) {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  if (!isBrowser) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing from localStorage:', err);
  }
};

export const clearLocalStorage = (): void => {
  if (!isBrowser) {
    return;
  }
  try {
    localStorage.clear();
  } catch (err) {
    console.error('Error clearing localStorage:', err);
  }
};
