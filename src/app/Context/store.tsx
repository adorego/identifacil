'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState} from 'react';

type DataType = {
    firstName: string
}
type SnackType = {
    open: boolean,
    message: string,

}

/*interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType[],
    setData: Dispatch<SetStateAction<DataType>>,
    sidebarStatus: boolean,
    setSidebarStatus: Dispatch<SetStateAction<boolean>>,
    snackBar: SnackType,
}*/

/*const GlobalContext = createContext<ContextProps>({*/
const GlobalContext = createContext({
    userId: '',
    setUserId: (): string => '',
    data: [],
    setData: (): DataType[] => [],
    sidebarStatus: true,
    setSidebarStatus: (): boolean => true,
    snackbar: { open: false, message: '' },
    openSnackbar: () => {},
    closeSnackbar: () => {}

})

export const GlobalContextProvider = ({children}) =>{
    const[userId, setUserId] = useState('');
    const[data,setData] = useState<[], DataType[]>([])
    const[sidebarStatus,setSidebarStatus] = useState(true)
    const[snackbar, setSnackbar] = useState(true)

    const openSnackbar = (message) => {
        setSnackbar({ open: true, message});
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' });
    };

    /* Variables que van a estar accesible de forma global */
    return(

        <GlobalContext.Provider
            value={{
                userId, setUserId,
                data, setData,
                sidebarStatus, setSidebarStatus,
                snackbar, openSnackbar, closeSnackbar
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);