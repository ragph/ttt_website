import { PaletteMode } from '@mui/material';

export const getPalette = (mode: PaletteMode) => ({
  mode,
  ...(mode === 'light'
    ? {
        // Light mode colors
        primary: {
          main: '#002d73',
          light: '#0D47A1',
          dark: '#00193f',
        },
        secondary: {
          main: '#FFD23F',
          light: '#FFE082',
          dark: '#FFC107',
        },
        success: {
          main: '#00C18A',
          light: '#E6FFF9',
          dark: '#00A076',
        },
        info: {
          main: '#539BFF',
          light: '#EBF3FE',
          dark: '#1682d4',
        },
        error: {
          main: '#FA896B',
          light: '#FDEDE8',
          dark: '#f3704d',
        },
        warning: {
          main: '#FFAE1F',
          light: '#FEF5E5',
          dark: '#ae8e59',
        },
        text: {
          primary: '#2A3547',
          secondary: '#5A6A85',
        },
        background: {
          default: '#F5F5F9',
          paper: '#FFFFFF',
        },
        divider: '#E6E9F4',
      }
    : {
        // Dark mode colors
        primary: {
          main: '#1b60ff',
          light: '#253662',
          dark: '#0D47A1',
        },
        secondary: {
          main: '#FFD23F',
          light: '#4D3A2A',
          dark: '#FFC107',
        },
        success: {
          main: '#00C18A',
          light: '#1B3C48',
          dark: '#00A076',
        },
        info: {
          main: '#539BFF',
          light: '#223662',
          dark: '#1682d4',
        },
        error: {
          main: '#FA896B',
          light: '#4B313D',
          dark: '#f3704d',
        },
        warning: {
          main: '#FFAE1F',
          light: '#4D3A2A',
          dark: '#ae8e59',
        },
        text: {
          primary: '#EAEFF4',
          secondary: '#7C8FAC',
        },
        background: {
          default: '#171C23',
          paper: '#1E2631',
        },
        divider: '#333F55',
      }),
});
