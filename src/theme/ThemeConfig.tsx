import { ReactNode, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { getPalette } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';

interface ThemeConfigProps {
  children: ReactNode;
}

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  const themeMode = useAppSelector((state) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: getPalette(themeMode),
        typography,
        shadows,
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
