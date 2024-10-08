import React from 'react';
import { LgmUiWrapper } from '../lgm/LgmUiWrapper';
import { ToastContainer, toast } from 'react-toastify';
import { ReactToastifyCss } from './ReactToastifyCss';
import { createTheme, ThemeProvider } from '@mui/material';
const textFieldInactiveColor = 'white';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#ffffff'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: textFieldInactiveColor,
                        },
                        '&:hover fieldset': {
                            borderColor: textFieldInactiveColor,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: textFieldInactiveColor,
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: textFieldInactiveColor,
                    },
                    '& .MuiInputLabel-root': {
                        color: `${textFieldInactiveColor} !important`,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: '#5c7fa2',
                        color: 'white',
                        opacity: 0.5,
                    },
                },
            },
        },
    },
});

export const App = () => {
    return (
        <div
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <ReactToastifyCss/>
            <ThemeProvider theme={theme}>
                <LgmUiWrapper/>
            </ThemeProvider>
            <ToastContainer position={'bottom-right'}/>
        </div>
    );
};
