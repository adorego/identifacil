import React, { createContext, useState } from 'react';

export const SnackbarContext = createContext({
    snackbar: { open: false, message: '' },
    openSnackbar: (message:string) => {},
    closeSnackbar: () => {}
});

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const openSnackbar = (message:string) => {
        setSnackbar({ open: true, message });
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' });
    };

    return (
        <SnackbarContext.Provider value={{ snackbar, openSnackbar, closeSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};