import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#6a52b3',
            main: '#4527a0',
            dark: '#301b70',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff784e',
            main: '#ff5722',
            dark: '#b23c17',
            contrastText: '#000',
        },
    },
});

export default theme;
