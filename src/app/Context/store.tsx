'use client';

import React, { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from 'react';

type DataType = {
    firstName: string;
};

type SnackType = {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error' | '';
};

interface ContextProps {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    sidebarStatus: boolean;
    setSidebarStatus: Dispatch<SetStateAction<boolean>>;
    snackbar: SnackType;
    openSnackbar: (message: string, severity: SnackType['severity']) => void;
    closeSnackbar: () => void;
}

const SnackInitialState: SnackType = {
    open: false,
    message: '',
    severity: '',
};

// Proporcionar valores predeterminados de acuerdo con el tipo ContextProps
const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: () => {}, // Usar una función vacía como marcador de posición
    sidebarStatus: true,
    setSidebarStatus: () => {},
    snackbar: SnackInitialState,
    openSnackbar: () => {},
    closeSnackbar: () => {},
});

export const GlobalContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [userId, setUserId] = useState<string>('');
    const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);
    const [snackbar, setSnackbar] = useState<SnackType>(SnackInitialState);


    const openSnackbar = (message: string, severity: string) => {
        const validSeverities: SnackType['severity'][] = ['success', 'info', 'warning', 'error', ''];
        const computedSeverity: SnackType['severity'] = validSeverities.includes(severity as SnackType['severity']) ? severity as SnackType['severity'] : 'info';

        setSnackbar({ open: true, message, severity: computedSeverity });
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '', severity: '' });
    };

    /* Variables que van a estar accesible de forma global */
    return (
        <GlobalContext.Provider value={{ userId, setUserId, sidebarStatus, setSidebarStatus, snackbar, openSnackbar, closeSnackbar }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);