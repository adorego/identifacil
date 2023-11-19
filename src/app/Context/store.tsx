'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState} from 'react';

type DataType = {
    firstName: string
}

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    data: DataType[],
    setData: Dispatch<SetStateAction<DataType>>,
    sidebarStatus: boolean,
    setSidebarStatus: Dispatch<SetStateAction<boolean>>

}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    data: [],
    setData: (): DataType[] => [],
    sidebarStatus: true,
    setSidebarStatus: (): boolean => true,
})

export const GlobalContextProvider = ({children}) =>{
    const[userId, setUserId] = useState('');
    const[data,setData] = useState<[], DataType[]>([])
    const[sidebarStatus,setSidebarStatus] = useState(false)

    /* Variables que van a estar accesible de forma global */
    return(

        <GlobalContext.Provider value={{userId, setUserId, data, setData, sidebarStatus, setSidebarStatus}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);