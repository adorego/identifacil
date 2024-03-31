'use client';

import React, {createContext, useContext, Dispatch, SetStateAction, useState, ReactNode} from 'react';

type DataType = {
    firstName: string;
};

type SnackType = {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error' | '';
};

// 1. Definicion de los States contexts globales (Getter y Setter)
interface ContextProps {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    sidebarStatus: boolean;
    setSidebarStatus: Dispatch<SetStateAction<boolean>>;
    snackbar: SnackType;
    openSnackbar: (message: string, severity?: SnackType['severity']) => void;
    closeSnackbar: () => void;
    selectedEstablecimiento: number;
    setSelectedEstablecimiento: Dispatch<SetStateAction<number>>;
}

const SnackInitialState: SnackType = {
    open: false,
    message: '',
    severity: 'success',
};

// 2. Inicializacion de los  ContextProps globales
const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: () => {
    }, // Usar una función vacía como marcador de posición
    sidebarStatus: true,
    setSidebarStatus: () => {
    },
    snackbar: SnackInitialState,
    openSnackbar: () => {
    },
    closeSnackbar: () => {
    },
    selectedEstablecimiento: 0,
    setSelectedEstablecimiento: ()=>{}
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // 3. Definir el estado global
    const [userId, setUserId] = useState<string>('');
    const [snackbar, setSnackbar] = useState<SnackType>(SnackInitialState);
    const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState<number>(0);


    const openSnackbar = (message: string, severity: string = 'success') => {
        const validSeverities: SnackType['severity'][] = ['success', 'info', 'warning', 'error', ''];
        const computedSeverity: SnackType['severity'] = validSeverities.includes(severity as SnackType['severity']) ? severity as SnackType['severity'] : 'info';

        setSnackbar({open: true, message, severity: computedSeverity});
    };

    const closeSnackbar = () => {
        setSnackbar({open: false, message: '', severity: ''});
    };

    /* 4. Agregar aqui variable de estado global */
    return (
        <GlobalContext.Provider
            value={{userId, setUserId, sidebarStatus, setSidebarStatus, snackbar, openSnackbar, closeSnackbar, selectedEstablecimiento, setSelectedEstablecimiento}}>
            {children}
        </GlobalContext.Provider>
    );
};

// 5. -> import {useGlobalContext} from "@/app/Context/store";
// 6. -> const { openSnackbar } = useGlobalContext();

export const useGlobalContext = () => useContext(GlobalContext);